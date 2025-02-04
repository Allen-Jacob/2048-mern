FROM ubuntu:24.04

RUN apt-get update && apt-get install -y nodejs wget
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
COPY 2048-mern /home/ubuntu/2048-mern 
    
WORKDIR /home/ubuntu/2048-mern/client
RUN /root/.local/share/pnpm/pnpm install
RUN /root/.local/share/pnpm/pnpm build

WORKDIR /home/ubuntu/2048-mern/server
RUN wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
RUN /root/.local/share/pnpm/pnpm install

CMD ["pnpm", "run", "start"]