#!/bin/bash
echo "Seu nome de usuário é:"
whoami
echo "Info de hora atual e tempo que o computador está ligado:"
uptime
echo "O script está executando do diretório:"
pwd
echo "Iniciando serviço Express e Mongoose em background"
cd ~/Documentos/biblioteca/api
npm start .&
echo "Aguardando 5 segundos para iniciar React"
sleep 5
echo "Iniciando serviço React"
cd ~/Documentos/biblioteca
npm start
