import os
from flask import Flask, render_template, request, redirect, url_for, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Força a leitura do arquivo .env oculto
load_dotenv()

app = Flask(__name__)
app.secret_key = 'julia_retro_pixel_secret_key'

# Configurações buscando do sistema de forma segura
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_REMETENTE = os.getenv("EMAIL_REMETENTE")
EMAIL_SENHA = os.getenv("EMAIL_SENHA")
EMAIL_DESTINATARIO = os.getenv("EMAIL_DESTINATARIO")

# LOG DE DIAGNÓSTICO INICIAL (Garante que o Python está lendo o seu arquivo .env)
print("\n=== SYSTEM VERIFICATION INBOUND ===")
print(f"REMETENTE CARREGADO: {EMAIL_REMETENTE}")
print(f"DESTINATÁRIO CARREGADO: {EMAIL_DESTINATARIO}")
print(f"CHAVE DE SEGURANÇA DETECTADA: {'SIM (OK)' if EMAIL_SENHA else 'NÃO (FALHA: ARQUIVO .ENV EM BRANCO OU NÃO ENCONTRADO)'}")
print("===================================\n")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contato', methods=['GET', 'POST'])
def contato():
    if request.method == 'POST':
        nome = request.form.get('nome')
        email_utilizador = request.form.get('email')
        mensagem = request.form.get('mensagem')
        
        print(f"\n[POST ENCONTRADO] Nome: {nome} | Email: {email_utilizador}")
        
        if not nome or not email_utilizador or not mensagem:
            flash("Transmissão corrompida: Preencha todos os campos.", "error")
            return redirect(url_for('contato'))
            
        if not EMAIL_REMETENTE or not EMAIL_SENHA:
            print("[ERRO CRÍTICO] Falha no disparo: As variáveis SMTP no arquivo .env estão vazias.")
            flash("Erro interno do servidor: Credenciais SMTP ausentes no arquivo .env.", "error")
            return redirect(url_for('contato'))
            
        try:
            msg = MIMEMultipart()
            msg['From'] = EMAIL_REMETENTE
            msg['To'] = EMAIL_DESTINATARIO
            msg['Subject'] = f"[Portfólio] Nova mensagem de {nome}"
            
            # TRUQUE DO REPLY-TO: Permite responder direto pro e-mail do cliente
            msg['Reply-To'] = email_utilizador
            
            corpo = f"""
            Nova mensagem recebida através do formulário:
            
            Nome: {nome}
            E-mail: {email_utilizador}
            
            Mensagem:
            {mensagem}
            """
            msg.attach(MIMEText(corpo, 'plain', 'utf-8'))
            
            print("[SMTP] Conectando ao servidor do Gmail...")
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10)
            server.starttls()
            
            print("[SMTP] Autenticando com a senha de app...")
            server.login(EMAIL_REMETENTE, EMAIL_SENHA)
            
            print("[SMTP] Despachando pacote de email...")
            server.sendmail(EMAIL_REMETENTE, EMAIL_DESTINATARIO, msg.as_string())
            server.quit()
            
            print("[SMTP] Transmissão concluída com sucesso!")
            flash("Mensagem transmitida com sucesso! Aguarde retorno.", "success")
            
        except Exception as e:
            print(f"[LOG DE ERRO REAL] Falha no disparo: {str(e)}")
            flash(f"Falha na rede: {str(e)}", "error")
            
        return redirect(url_for('contato'))
        
    return render_template('contato.html')

if __name__ == '__main__':
    app.run(debug=True)