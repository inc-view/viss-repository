import os
import psutil
import platform
import datetime
from datetime import date
import time
import mysql.connector
import mysql.connector.errorcode
import socket

""" webhook = "https://hooks.slack.com/services/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" """

# Conexão Jira
""" def connectJira():
    url = "https://streamoon.atlassian.net/rest/api/3/issue"
    auth = HTTPBasicAuth("SuporteStreamoon@gmail.com", "ATATT3xFfGF0QhLRC4Fh1bmPO3_a8GKt1rNexYJtzah5_BRgHq3C_Vfyd0RgYtIAo6wii5U2SR-_o9fI4JLpzgK8BjgBaaoMdHm9X_8GhAyGa9ya9yg7J7JjO9lIujiDcrQwxTOrXswYDzbTv9UWlX3nBTnM83J9C2WAgbnlaOD6EyurDrDHa54=87D5F38C")

    headers ={
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
   
    payload = json.dumps({
            "fields":{  
                "summary": "Alerta Servidor",
                "project":{"key":"STREAMOON"},
                'issuetype':{'name':'[System] Incident'}
            }
    })
   
    response = requests.request(
        "POST",
        url,
        data=payload,
        headers=headers,
        auth=auth
    ) """

consoleColors = {
    "black": "\u001b[30m",
    "red": "\u001b[31m",
    "green": "\u001b[32m",
    "yellow": "\u001b[33m",
    "blue": "\u001b[34m",
    "magenta": "\u001b[35m",
    "cyan": "\u001b[36m",
    "white": "\u001b[37m",
    "brightBlack": "\u001b[30;1m",
    "brightRed": "\u001b[31;1m",
    "brightGreen": "\u001b[32;1m",
    "brightYellow": "\u001b[33;1m",
    "brightBlue": "\u001b[34;1m",
    "brightMagenta": "\u001b[35;1m",
    "brightCyan": "\u001b[36;1m",
    "brightWhite": "\u001b[37;1m",
    "reset": "\u001b[0m",
}

connection = mysql.connector.connect(
    host="localhost",
    user="aluno",
    password="sptech",
    port=3306,
    database="inkView"
)

cursor = connection.cursor()

def showText():
    print(f"""{consoleColors['cyan']}
[]=================================================================[]
|                                                                   |
|      ██╗███╗   ██╗ ██████╗    ██╗   ██╗██╗███████╗██╗    ██╗      |
|      ██║████╗  ██║██╔════╝    ██║   ██║██║██╔════╝██║    ██║      |
|      ██║██╔██╗ ██║██║         ██║   ██║██║█████╗  ██║ █╗ ██║      |
|      ██║██║╚██╗██║██║         ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║      |
|      ██║██║ ╚████║╚██████╗     ╚████╔╝ ██║███████╗╚███╔███╔╝      |
|      ╚═╝╚═╝  ╚═══╝ ╚═════╝      ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝       |
|                                                                   |
[]=================================================================[]  
              {consoleColors['reset']}{consoleColors['cyan']}
                    Network Name: {platform.node()}
                    Processor: {platform.processor()}
                    Operating System: {platform.system()}\n
[]=================================================================[]{consoleColors['reset']}\n""")
    
def ProgressBar(percentual): 
    if(percentual>=0 or percentual<=100): 
        B="["+(chr(9632)*(percentual))+"]"; 
        if(percentual < 70):
            print(f"""{consoleColors['green']}{B}{consoleColors['reset']}\n""")
        elif(percentual < 90):
            print(f"""{consoleColors['yellow']}{B}{consoleColors['reset']}\n""")
        else:
            print(f"""{consoleColors['red']}{B}{consoleColors['reset']}\n""")


cpuQuantity = psutil.cpu_count(logical=True)
for i in range(cpuQuantity):
    cpuName = (f"CPU{i+1}")

opcao = ""

while not opcao in ("1", "2"):
    print("Escolha uma opção:\n1- Registrar dados\n2- Sair\n")
    opcao = input()
    ipMaquina = socket.gethostbyname(socket.gethostname())

if opcao == "2":
    print("Processos finalizados")

if opcao == "1":
    while True:
        systemClear = ('clear' if platform.system() == 'Linux' else 'cls')

        cpusPercent = psutil.cpu_percent(interval=1, percpu=True)
        memory = (psutil.virtual_memory())
        memoryPercent = memory.percent
        memoryUsed = round((memory.used / 1024 / 1024 / 1000), 1)
        memoryTotal = round((memory.total / 1024 / 1024 / 1000), 1)
        diskPartitions = psutil.disk_partitions()
        diskPercent = psutil.disk_usage(diskPartitions[0].mountpoint)
        dateNow = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") 

        os.system(systemClear)

        showText()
        
        somaCpus = 0
        mediaCpus = 0
        for i in range(psutil.cpu_count()):
            somaCpus += cpusPercent[i]
            cpuName1 = (f"CPU{i+1}")
            print(f"""{cpuName1}: {cpusPercent[i]}%""")
            (ProgressBar(percentual=int(cpusPercent[i])))
        print(f"""Memória Percent: {memoryPercent}%""")
        ProgressBar(percentual=int(memoryPercent))
        print(f"""Memória Usada: {memoryUsed} GB""")
        ProgressBar(percentual=int(memoryUsed))
        print(f"""Memoria Total: {memoryTotal} GB""")
        ProgressBar(percentual=int(memoryTotal))
            
        mediaCpus = round((somaCpus / len(cpusPercent)),2)

        try:
            selectIpMaquina = f"select cpu, ram, disco from vwIdComponenteComputador where ipComputador = '{str(ipMaquina)}'"
            cursor.execute(selectIpMaquina)
            idsComponentes = cursor.fetchone()

            mySqlInsertQueryCpuPercent = f"INSERT INTO registro VALUES (null, {str(mediaCpus)},  current_timestamp(), {idsComponentes[0]});"
            mySqlInsertQueryMemoryPercent = f"INSERT INTO registro VALUES (null, {str(memoryPercent)},  current_timestamp(), {idsComponentes[1]});"
            mySqlInsertQueryDiskPercent = f"INSERT INTO registro VALUES (null, {str(diskPercent.percent)},  current_timestamp(), {idsComponentes[2]});"

            cursor.execute(mySqlInsertQueryCpuPercent)
            cursor.execute(mySqlInsertQueryMemoryPercent)
            cursor.execute(mySqlInsertQueryDiskPercent)



            # mySqlInsertQueryMemoryUsed = "INSERT INTO registro VALUES (null, " + str(memoryUsed) + ",  current_timestamp(), 3);"
            # mySqlInsertQueryMemoryTotal = "INSERT INTO registro VALUES (null, " + str(memoryTotal) + ",  current_timestamp(), 3);"
            # cursor.execute(mySqlInsertQueryMemoryUsed)
            # cursor.execute(mySqlInsertQueryMemoryTotal)

            connection.commit()

        except mysql.connector.Error as error:
           print("Failed to insert record into Laptop table {}".format(error))

        time.sleep(2)
    

if connection.is_connected():
    cursor.close()
    connection.close()