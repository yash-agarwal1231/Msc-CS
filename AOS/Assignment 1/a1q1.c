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
    {101, 1},    // EMI
    {102, 1},    // Withdrawal
    {103, 0}     // Deposit
};

void display()
{
    printf("\n--- BUFFER LIST ---\n");
    printf("B0 -> Block 101 -> BUSY\n");
    printf("B1 -> Block 102 -> BUSY\n");
    printf("B2 -> Block 103 -> FREE\n");

    printf("\n--- FREE LIST ---\n");
    printf("B2 -> NULL\n");
}

void emi(struct Bank *bank, int fd)
{
    int x;

    printf("\n[EMI] PID = %d", getpid());
    printf("\nScenario 5: EMI buffer is busy.");
    printf("\nEMI goes to sleep...\n");

    read(fd, &x, sizeof(x));

    printf("[EMI] Woke up after deposit.");
    printf("\n[EMI] Reads balance = %d\n", bank->balance);

    sleep(1);

    if (bank->balance >= 500) {
        bank->balance -= 500;
        printf("[EMI] EMI of Rs.500 paid.\n");
    } else {
        printf("[EMI] Insufficient balance.\n");
    }

    exit(0);
}

void withdrawal(struct Bank *bank, int fd)
{
    int x;

    printf("\n[WITHDRAWAL] PID = %d", getpid());
    printf("\nScenario 4: Free list unavailable.");
    printf("\nWithdrawal goes to sleep...\n");

    read(fd, &x, sizeof(x));

    printf("[WITHDRAWAL] Woke up after deposit.");
    printf("\n[WITHDRAWAL] Reads balance = %d\n", bank->balance);

    sleep(1);

    if (bank->balance >= 700) {
        bank->balance -= 700;
        printf("[WITHDRAWAL] Rs.700 withdrawn.\n");
    } else {
        printf("[WITHDRAWAL] Insufficient balance.\n");
    }

    exit(0);
}

void deposit(struct Bank *bank, int fd1, int fd2)
{
    int x = 1;

    printf("\n[DEPOSIT] PID = %d", getpid());
    printf("\nScenario 2: Free buffer B2 allocated.\n");

    bank->balance += 1000;

    printf("[DEPOSIT] Rs.1000 deposited.\n");
    printf("[DEPOSIT] New balance = %d\n", bank->balance);

    write(fd1, &x, sizeof(x));
    write(fd2, &x, sizeof(x));

    printf("[DEPOSIT] EMI and Withdrawal are awakened.\n");

    exit(0);
}

int main()
{
    struct Bank *bank;
    int p1[2], p2[2];
    pid_t e, w, d;

    bank = mmap(NULL, sizeof(struct Bank),
                PROT_READ | PROT_WRITE,
                MAP_SHARED | MAP_ANONYMOUS, -1, 0);

    bank->balance = 1000;

    pipe(p1);
    pipe(p2);

    printf("Initial Balance = Rs.%d\n", bank->balance);

    display();

    e = fork();

    if (e == 0) {
        close(p1[1]);
        emi(bank, p1[0]);
    }

    w = fork();

    if (w == 0) {
        close(p2[1]);
        withdrawal(bank, p2[0]);
    }

    d = fork();

    if (d == 0) {
        deposit(bank, p1[1], p2[1]);
    }

    wait(NULL);
    wait(NULL);
    wait(NULL);

    printf("\nFinal Balance = Rs.%d\n", bank->balance);

    munmap(bank, sizeof(struct Bank));

    return 0;
}