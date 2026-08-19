#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/mman.h>

struct Bank {
    int balance;
};

struct Buffer {
    int block;
    int busy;
};

struct Buffer b[3] = {
    {101, 1},       /* B0 - EMI        - BUSY */
    {102, 1},       /* B1 - Withdrawal - BUSY */
    {103, 0}        /* B2 - Deposit    - FREE */
};


/* Display buffer block list and free list */
void display()
{
    printf("\n====================================");
    printf("\n       BUFFER BLOCK LIST");
    printf("\n====================================\n");

    printf("B0 -> Block 101 -> EMI        -> BUSY\n");
    printf("B1 -> Block 102 -> Withdrawal -> BUSY\n");
    printf("B2 -> Block 103 -> Deposit    -> FREE\n");

    printf("\nFREE LIST:\n");
    printf("B2 -> NULL\n");
}


/* Scenario 5 */
void scenario5()
{
    printf("\n[SCENARIO 5]");
    printf("\nRequested buffer is BUSY.");
    printf("\nProcess cannot use the buffer.");
    printf("\nProcess goes to SLEEP mode...\n");
}


/* Scenario 4 */
void scenario4()
{
    printf("\n[SCENARIO 4]");
    printf("\nFree list is EMPTY.");
    printf("\nProcess cannot get a free buffer.");
    printf("\nProcess goes to SLEEP mode...\n");
}


/* EMI process */
void emi(struct Bank *bank, int fd)
{
    int msg;

    printf("\n------------------------------------");
    printf("\n       EMI PROCESS");
    printf("\n------------------------------------");
    printf("\nPID: %d", getpid());
    printf("\nRequested Buffer: B0");
    printf("\nBlock Number: 101");

    scenario5();

    printf("[EMI] Waiting for Deposit process...\n");

    /* Receive IPC message */
    read(fd, &msg, sizeof(msg));

    printf("\n[IPC] Deposit -> EMI : Deposit completed.");
    printf("\n[IPC] EMI received message.\n");

    printf("\n[EMI] WOKE UP.");
    printf("\n[EMI] Enters race condition.");
    printf("\n[EMI] Reads balance = Rs.%d\n", bank->balance);

    sleep(1);

    if (bank->balance >= 500) {
        bank->balance -= 500;

        printf("[EMI] EMI of Rs.500 paid.");
        printf("\n[EMI] New balance = Rs.%d\n", bank->balance);
    } else {
        printf("[EMI] Insufficient balance.\n");
    }

    close(fd);
    exit(0);
}


/* Withdrawal process */
void withdrawal(struct Bank *bank, int fd)
{
    int msg;

    printf("\n------------------------------------");
    printf("\n       WITHDRAWAL PROCESS");
    printf("\n------------------------------------");
    printf("\nPID: %d", getpid());
    printf("\nRequested Buffer: B1");
    printf("\nBlock Number: 102");

    scenario4();

    printf("[WITHDRAWAL] Waiting for Deposit process...\n");

    /* Receive IPC message */
    read(fd, &msg, sizeof(msg));

    printf("\n[IPC] Deposit -> Withdrawal : Deposit completed.");
    printf("\n[IPC] Withdrawal received message.\n");

    printf("\n[WITHDRAWAL] WOKE UP.");
    printf("\n[WITHDRAWAL] Enters race condition.");
    printf("\n[WITHDRAWAL] Reads balance = Rs.%d\n",
           bank->balance);

    sleep(1);

    if (bank->balance >= 700) {
        bank->balance -= 700;

        printf("[WITHDRAWAL] Rs.700 withdrawn.");
        printf("\n[WITHDRAWAL] New balance = Rs.%d\n",
               bank->balance);
    } else {
        printf("[WITHDRAWAL] Insufficient balance.\n");
    }

    close(fd);
    exit(0);
}


/* Deposit process */
void deposit(struct Bank *bank, int emiPipe, int withdrawPipe)
{
    int msg = 1;

    printf("\n------------------------------------");
    printf("\n       DEPOSIT PROCESS");
    printf("\n------------------------------------");
    printf("\nPID: %d", getpid());
    printf("\nRequested Buffer: B2");
    printf("\nBlock Number: 103");

    printf("\n\n[DEPOSIT] B2 is FREE.");
    printf("\n[DEPOSIT] Free buffer allocated.");
    printf("\n[DEPOSIT] Depositing Rs.1000...\n");

    sleep(1);

    bank->balance += 1000;

    printf("[DEPOSIT] Deposit completed.");
    printf("\n[DEPOSIT] New balance = Rs.%d\n",
           bank->balance);

    /* IPC through pipes */
    write(emiPipe, &msg, sizeof(msg));
    printf("\n[IPC] Deposit -> EMI");
    printf("\n[IPC] Message sent: Deposit completed.");

    write(withdrawPipe, &msg, sizeof(msg));
    printf("\n[IPC] Deposit -> Withdrawal");
    printf("\n[IPC] Message sent: Deposit completed.\n");

    close(emiPipe);
    close(withdrawPipe);

    exit(0);
}


int main()
{
    struct Bank *bank;

    int p1[2], p2[2];

    pid_t emiPID, withdrawPID, depositPID;

    /* Create shared memory */
    bank = mmap(NULL,
                sizeof(struct Bank),
                PROT_READ | PROT_WRITE,
                MAP_SHARED | MAP_ANONYMOUS,
                -1, 0);

    if (bank == MAP_FAILED) {
        perror("mmap");
        exit(1);
    }

    /* Initial balance */
    bank->balance = 1000;

    /* Create pipes */
    pipe(p1);
    pipe(p2);

    printf("\n============================================");
    printf("\n       BANKING TRANSACTION SYSTEM");
    printf("\n       getblk() Scenario 4 & 5");
    printf("\n============================================\n");

    printf("\nInitial Bank Balance = Rs.%d\n",
           bank->balance);

    display();

    printf("\n============================================");
    printf("\nCreating EMI, Withdrawal and Deposit");
    printf(" processes...");
    printf("\n============================================\n");


    /* Create EMI process */
    emiPID = fork();

    if (emiPID == 0) {
        close(p1[1]);
        close(p2[0]);
        close(p2[1]);

        emi(bank, p1[0]);
    }


    /* Create Withdrawal process */
    withdrawPID = fork();

    if (withdrawPID == 0) {
        close(p2[1]);
        close(p1[0]);
        close(p1[1]);

        withdrawal(bank, p2[0]);
    }


    /* Create Deposit process */
    depositPID = fork();

    if (depositPID == 0) {
        close(p1[0]);
        close(p2[0]);

        deposit(bank, p1[1], p2[1]);
    }


    /* Parent closes all pipe ends */
    close(p1[0]);
    close(p1[1]);
    close(p2[0]);
    close(p2[1]);


    /* Wait for all processes */
    wait(NULL);
    wait(NULL);
    wait(NULL);

    printf("\n\n============================================");
    printf("\n          ALL PROCESSES COMPLETED");
    printf("\n============================================");

    printf("\nFinal Shared Balance = Rs.%d\n",
           bank->balance);

    printf("\nIPC used:");
    printf("\n1. pipe()  -> Communication between processes");
    printf("\n2. mmap()  -> Shared bank balance");
    printf("\n3. fork()  -> Creation of processes");
    printf("\n4. wait()  -> Parent waits for children");
    printf("\n5. sleep() -> Simulates sleeping processes\n");

    munmap(bank, sizeof(struct Bank));

    return 0;
}
