#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>
#include <sys/mman.h>
#include <semaphore.h>

typedef struct Buffer{
    int block;
    int busy;
    int next;
    int prev;
}Buffer;

typedef struct Shared{
    int balance;
    int freeHead;
    Buffer b[3];
    sem_t lock;
}Shared;

void show(Shared *s){
    int p=s->freeHead;

    printf("\n======================================================================\n");
    printf("                           FREE LIST\n");
    printf("======================================================================\n");
    printf("Free List: ");

    while(p!=-1){
        printf("B%d -> ",p+1);
        p=s->b[p].next;
    }

    printf("NULL\n");

    printf("\n======================================================================\n");
    printf("                       BUFFER BLOCK LIST\n");
    printf("======================================================================\n");

    for(int i=0;i<3;i++)
        printf("B%d(Block %d)    ",i+1,s->b[i].block);

    printf("\n");
}

void emi(Shared *s){
    sleep(3);

    printf("\n======================================================================\n");
    printf("                         EMI PROCESS\n");
    printf("======================================================================\n");
    printf("\nEMI: Checking balance...\n");

    if(s->balance<800){
        sleep(3);
        printf("\nEMI: Insufficient balance -> SLEEP (Scenario 4)\n");
        raise(SIGSTOP);
    }

    sem_wait(&s->lock);

    if(s->balance>=800){
        s->balance-=800;
        sleep(4);
        printf("\nEMI: ₹800 deducted. Balance = ₹%d\n",s->balance);
    }

    sem_post(&s->lock);

    exit(0);
}

void withdraw(Shared *s){
    sleep(1);

    printf("\n======================================================================\n");
    printf("                      WITHDRAWAL PROCESS\n");
    printf("======================================================================\n");
    printf("\nWithdrawal: Checking balance...\n");

    sleep(5);

    if(s->balance<600){
        sleep(3);
        printf("\nWithdrawal: Insufficient balance -> SLEEP (Scenario 5)\n");
        raise(SIGSTOP);
    }

    sem_wait(&s->lock);

    if(s->balance>=600){
        s->balance-=600;
        sleep(3);
        printf("\nWithdrawal: ₹600 deducted. Balance = ₹%d\n",s->balance);
    }

    sem_post(&s->lock);

    exit(0);
}

void deposit(Shared *s,pid_t e,pid_t w){

    sem_wait(&s->lock);

    sleep(5);

    printf("\n======================================================================\n");
    printf("                         DEPOSIT PROCESS\n");
    printf("======================================================================\n");
    printf("\nDeposit: Adding ₹2000...\n");

    s->balance+=2000;

    sleep(3);

    printf("Deposit: Balance = ₹%d\n",s->balance);

    s->b[0].busy=0;
    s->freeHead=0;

    sleep(4);

    printf("\nDeposit: Buffer released. Waking EMI and Withdrawal...\n");

    sem_post(&s->lock);

    kill(e,SIGCONT);
    kill(w,SIGCONT);

    printf("\n");

    sleep(2);

    printf("[IPC] Deposit sent SIGCONT to EMI and Withdrawal.\n");

    exit(0);
}

int main(){

    /*
     * Shared Memory IPC
     */
    Shared *s=mmap(NULL,sizeof(Shared),
                   PROT_READ|PROT_WRITE,
                   MAP_SHARED|MAP_ANONYMOUS,-1,0);

    s->balance=500;

    printf("\n╔══════════════════════════════════════════════════════════════════════╗\n");
    printf("║                         PROGRAM START                                ║\n");
    printf("╚══════════════════════════════════════════════════════════════════════╝\n");
    printf("\nInitial Balance :- ₹%d\n",s->balance);

    /*
     * Semaphore for process synchronization
     */
    sem_init(&s->lock,1,1);

    printf("\n=======================================================================");
    printf("\n[IPC] Shared memory created and semaphore initialized.\n");
    printf("=======================================================================\n");

    for(int i=0;i<3;i++){
        s->b[i].block=10+i;
        s->b[i].busy=1;
        s->b[i].next=-1;
        s->b[i].prev=-1;
    }

    s->freeHead=-1;

    /*
     * Create EMI process
     */
    pid_t e=fork();

    if(e==0)
        emi(s);

    /*
     * Create Withdrawal process
     */
    pid_t w=fork();

    if(w==0)
        withdraw(s);

    printf("\n[IPC] EMI and Withdrawal processes created using fork().\n");
    printf("=======================================================================\n");

    int status;

    /*
     * Parent waits for both processes to stop
     */
    waitpid(e,&status,WUNTRACED);
    waitpid(w,&status,WUNTRACED);

    printf("\n======================================================================\n");
    printf("[IPC] EMI and Withdrawal stopped; creating Deposit process.\n");
    printf("======================================================================\n");

    /*
     * Create Deposit process
     */
    pid_t d=fork();

    if(d==0)
        deposit(s,e,w);

    /*
     * Wait for Deposit
     */
    waitpid(d,NULL,0);

    /*
     * Wait for EMI and Withdrawal
     */
    waitpid(e,NULL,0);
    waitpid(w,NULL,0);

    sleep(4);

    printf("\n╔══════════════════════════════════════════════════════════════════════╗\n");
    printf("║                         FINAL RESULT                                 ║\n");
    printf("╚══════════════════════════════════════════════════════════════════════╝\n");

    printf("\nFinal Balance = ₹%d\n",s->balance);

    show(s);

    sem_destroy(&s->lock);
    munmap(s,sizeof(Shared));

    printf("\n╔══════════════════════════════════════════════════════════════════════╗\n");
    printf("║                         PROGRAM END                                  ║\n");
    printf("╚══════════════════════════════════════════════════════════════════════╝\n");

    return 0;
}