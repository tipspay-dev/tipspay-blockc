# -----------------------------
# TIPSPAY BLOCKCHAIN DOCKERFILE
# Go Node Version
# -----------------------------

FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o tipspay-node ./cmd/node

FROM alpine:3.19

WORKDIR /app

COPY --from=builder /app/tipspay-node .

EXPOSE 26656 26657 8545

CMD ["./tipspay-node"]
