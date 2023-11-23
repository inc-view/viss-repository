import time
import threading
import keyboard

texto_digitado = ""
caps_lock_ativo = False

# Lista de teclas a serem ignoradas
teclas_a_serem_ignoradas = {"shift", "ctrl", "alt", "alt gr", "tab", "enter", "up", "down", "left", "right", "esc", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", 
                            "f9", "f10", "f11", "f12", "insert", "delete", "home", "end", "page up", "page down", "num lock", "print screen", "scroll lock", "pause", "win", 
                            "cmd", "menu", "volume up", "volume down", "volume mute", "play/pause", "stop", "previous track", "next track", "eject", "sleep", "browser", 
                            "search", "mail", "calculator", "computer", "app1", "app2", "help", "power", "currency subunit", "currency unit", "undo", "redo", "copy", "paste",}

def imprimir_texto_e_contar_palavras():
    global texto_digitado, teclas_a_serem_ignoradas
    while True:
        time.sleep(10)
        if texto_digitado:
            palavras = texto_digitado.split()
            quantidade_palavras = len(palavras)
            print("Texto digitado:")
            print(texto_digitado)
            print(f"Quantidade de palavras: {quantidade_palavras}")
            ppm = quantidade_palavras
            print(f"PPM: {ppm:.2f}")
            texto_digitado = ""
            # Redefine a lista de teclas a serem ignoradas após a exibição
            teclas_a_serem_ignoradas = {"shift", "ctrl", "alt", "alt gr", "tab", "enter", "up", "down", "left", "right", "esc", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", 
                            "f9", "f10", "f11", "f12", "insert", "delete", "home", "end", "page up", "page down", "num lock", "print screen", "scroll lock", "pause", "win", 
                            "cmd", "menu", "volume up", "volume down", "volume mute", "play/pause", "stop", "previous track", "next track", "eject", "sleep", "browser", 
                            "search", "mail", "calculator", "computer", "app1", "app2", "help", "power", "currency subunit", "currency unit", "undo", "redo", "copy", "paste",}


def on_key_event(e):
    global texto_digitado, caps_lock_ativo, teclas_a_serem_ignoradas
    if e.event_type == keyboard.KEY_DOWN:
        if e.name == "caps lock":
            caps_lock_ativo = not caps_lock_ativo
        elif e.name not in teclas_a_serem_ignoradas and (e.name.isalpha() or e.name.isdigit() or e.name == "space" or e.name == "backspace" or e.name == "back" or e.name == "spacebar" or e.name == "SPACE" or e.name == "SPACEBAR" or e.name == "BACKSPACE" or e.name == "BACK"):
            if caps_lock_ativo:
                if e.name in {"space", "spacebar", "SPACE", "SPACEBAR"}:
                    texto_digitado += " "
                elif e.name in {"backspace", "back", "BACKSPACE", "BACK"}:
                    texto_digitado = texto_digitado[:-1]
                else:
                    texto_digitado += e.name.upper()
            elif e.name in {"space", "spacebar", "SPACE", "SPACEBAR"}:
                texto_digitado += " "
            elif e.name in {"backspace", "back", "BACKSPACE", "BACK"}:
                texto_digitado = texto_digitado[:-1]
            else:
                texto_digitado += e.name
            # Remove a tecla da lista de teclas a serem ignoradas
            if e.name in teclas_a_serem_ignoradas:
                teclas_a_serem_ignoradas.remove(e.name)

# Configura o Listener para capturar teclas
keyboard.hook(on_key_event)

thread_imprimir = threading.Thread(target=imprimir_texto_e_contar_palavras)
thread_imprimir.daemon = True
thread_imprimir.start()

thread_imprimir.join()