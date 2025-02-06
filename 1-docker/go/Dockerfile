FROM golang AS builder
WORKDIR /usr/src/app
COPY go.mod main.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags="-s -w" -o main .


FROM scratch 
COPY --from=builder /usr/src/app/main .
CMD [ "./main" ]