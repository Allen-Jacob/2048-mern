FROM ubuntu:24.04

RUN apt-get update && apt-get install -y nodejs curl
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
COPY 2048-mern /home/ubuntu/2048-mern 
    
WORKDIR /home/ubuntu/2048-mern/client
RUN pnpm install
RUN pnpm build

WORKDIR /home/ubuntu/2048-mern/server
RUN wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
RUN pnpm install

CMD ["pnpm", "run", "start"]
