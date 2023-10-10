import os
import psutil
import platform
import datetime
from datetime import date
import time
import mysql.connector
import mysql.connector.errorcode
import matplotlib.pyplot as plt
import requests
import json
import pandas as pd

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
              {consoleColors['reset']}""")

    print(f"""{consoleColors['cyan']}
            Network Name: {platform.node()}
            Processor: {platform.processor()}
            Operating System: {platform.system()}\n
[]=================================================================[]{consoleColors['reset']}\n""")

cpuQuantity = psutil.cpu_count(logical=True)
for i in range(cpuQuantity):
    cpuName = (f"CPU{i+1}")

opcao = ""

while not opcao in ("1", "2", "3"):
    print("Escolha uma opção:\n1- Registrar dados\n2- Exibir histórico\n3- Sair\n")
    """ print(psutil.net_if_addrs()) """
    opcao = input()

if opcao == "3":
    print("Processos finalizados")

""" elif opcao == "2":
    fig = plt.figure()
    gs = fig.add_gridspec(1,3)
    fig.set_figheight(100)
    fig.set_figwidth(300)
    axs = gs.subplots(sharex=True, sharey=True)
    # recuperamos todas as colunas dos últimos 40 registros (~20 min)
    # Uma possível melhoria seria deixar o usuário escolher o período que quer observar
    cursor.execute("SELECT * FROM registros ORDER BY dataRegistro DESC LIMIT 40")
    x = []
    yCpu = []
    yRam = []
    yDisco = []
    
    # aqui são montados os arrays, para exibir através do matplotlib
    for (id, cpu, ram, disco, dataRegistro) in cursor:
        x.append(dataRegistro)
        yCpu.append(cpu)
        yRam.append(ram)
        yDisco.append(disco)

    # Todos usam o mesmo array x, pois todos se referem às mesmas datas e horas.
    axs[0].plot(x, yCpu, 'g')
    axs[0].set_title('Uso de CPU')
    axs[0].tick_params(axis='x', labelrotation = 45)
    axs[0].set_ylabel('Porcentagem de uso (%)')
   
    axs[1].plot(x, yRam, 'b')
    axs[1].set_title('Uso de RAM')
    axs[1].tick_params(axis='x', labelrotation = 45)
    axs[1].set_xlabel('Data e hora do registro')

    axs[2].plot(x, yDisco, 'r')
    axs[2].set_title('Uso de disco')
    axs[2].tick_params(axis='x', labelrotation = 45)
   
    # Setando yticks para que sejam exibidas labels de 10 em 10 % na esquerda
    plt.yticks([0,10,20,30,40,50,60,70,80,90,100])

    # Adicionando margem, para que o título do eixo x não fique cortado
    plt.subplots_adjust(bottom=0.20)
    plt.show()
 """
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

        diskUseList = []

        # A variável diskBar é um array de strings, onde vão sendo armazenadas as barras
        # que são exibidas no console. Assim como a diskUseList, cada posição deste array
        # armazena a barra referente à uma partição.
        diskBar = []
        # percorremos todas as partições obtidas a partir da psutil. A função enumerate  é do
        # próprio python, e basicamente ela nos "dá" um id para cada item.
        # Seria possível usar o for com uma sintaxe do tipo
        #   for part in partitions:
        # Porém,  tem o problema que neste caso não temos como saber em qual índice estamos
        # atualmente, sem computações adicionais. A função enumerate simplifica esse processo,
        # nos dando tanto o item do array quanto seu respectivo índice (representados por part
        # e k neste for, respectivamente)
        for (k, part) in enumerate(diskPartitions):
            # Usamos a propriedade "device" da partição, para obter o seu uso de disco, e adicionamos
            # no array diskUseList
            diskUseList.append(psutil.disk_usage(part.device))
            # Também aproveitamenos para já começar a criação da barra de porcentagem que é exibida
            # no console.
            if (diskUseList[k].percent <= 70):
                diskBar.append(consoleColors['green'] + "|")
            elif (diskUseList[k].percent <= 90):
                diskBar.append(consoleColors['yellow'] + "|")
            else:
                diskBar.append(consoleColors['red'] + "|")
                # A função virtual_memory retorna todas as estatístcas de uso da RAM, como
        # Total disponível, quanto esta sendo usado, porcentagem usada, etc.
        cpuBar = ""
        ramBar = ""
            # Assim como no disco acima, criamos o início das barras que serão exibidas no console,
            # com as respectivas métricas.
        if (cpusPercent[i] <= 70):
            cpuBar = consoleColors['green'] + "|"
        elif (cpusPercent[i] <= 90):
            cpuBar = consoleColors['yellow'] + "|"
        else:
            cpuBar = consoleColors['red'] + "|"
        if (memoryPercent <= 70):
            ramBar = consoleColors['green'] + "|"
        elif (memoryPercent <= 90):
            ramBar = consoleColors['yellow'] + "|"
        else:
            ramBar = consoleColors['red'] + "|"
           
        # no caso do disco, novamente temos que usar um for para percorrer todas as partições.
        for (k, disk) in enumerate(diskUseList):
            if (diskPercent.percent <= i*2):
                diskBar[k] += " "
            else:
                diskBar[k] += "="
        if (memoryPercent <= i*2):
            ramBar += " "
        else:
            ramBar += "=" 


        # Finalizamos as barras, adicionando um "|" e a cor branca.
        # É importante voltar a cor para branco aqui, se não essas cores começam
        # a vazar para o resto do console.
        cpuBar += "|" + consoleColors['white']          
        ramBar += "|" + consoleColors['white']  

        for (k,disk) in enumerate(diskUseList):        
            diskBar[k] += "|" + consoleColors['white']

        os.system(systemClear)

        showText()
        print("Memória Percent: ", memoryPercent, "%\n", ramBar, "\nMemória Total: ", memoryTotal, "GB", "\nMemoria Usada: ", memoryUsed, "GB")
        
        somaCpus = 0
        mediaCpus = 0
        for i in range(psutil.cpu_count()):
            somaCpus += cpusPercent[i]
            cpuName1 = (f"CPU{i+1}")
            for j in range(51):
                if (cpusPercent[i] <= j*2):
                    cpuBar += " "
                else:
                    cpuBar += "="
            print(cpuName1, ":", cpusPercent[i], "%")
            
        mediaCpus = round((somaCpus / len(cpusPercent)),2)

        try:
            mySqlInsertQueryCpuPercent = "INSERT INTO registro VALUES (null, " + str(mediaCpus) + ",  current_timestamp(), 1);"
            mySqlInsertQueryMemoryPercent = "INSERT INTO registro VALUES (null, " + str(memoryPercent) + ",  current_timestamp(), 2);"
            mySqlInsertQueryMemoryUsed = "INSERT INTO registro VALUES (null, " + str(memoryUsed) + ",  current_timestamp(), 3);"
            mySqlInsertQueryMemoryTotal = "INSERT INTO registro VALUES (null, " + str(memoryTotal) + ",  current_timestamp(), 3);"
            mySqlInsertQueryDiskPercent = "INSERT INTO registro VALUES (null, " + str(mediaCpus) + ",  current_timestamp(), 4);"
             
            cursor.execute(mySqlInsertQueryCpuPercent)
            cursor.execute(mySqlInsertQueryMemoryPercent)
            cursor.execute(mySqlInsertQueryMemoryUsed)
            cursor.execute(mySqlInsertQueryMemoryTotal)
            cursor.execute(mySqlInsertQueryDiskPercent)
            
            connection.commit()

        except mysql.connector.Error as error:
           print("Failed to insert record into Laptop table {}".format(error))

        time.sleep(2)
    

if connection.is_connected():
    cursor.close()
    connection.close()

