FROM public.ecr.aws/bitnami/node:14.15.3-prod-debian-10-r15

WORKDIR '/app'

COPY package*.json ./
RUN npm install
COPY lib .

EXPOSE 80

CMD ["npm","start"]