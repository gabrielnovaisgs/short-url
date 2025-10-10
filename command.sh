command=${1:-"dev"}


db_reset() {
  cd ./back && \
    . ./.env && \
    [ $NODE_ENV = "dev" ] && pnpm db:reset && pnpm prisma:seed || echo "Command allowed only in dev enviroment" 
}

case $command in
  dev)
    docker compose -f infra/compose.dev.yml up -d && \
    pnpm -r start:dev
    ;;
  build)
    pnpm build --filter front --filter back
    ;;
  db:reset)
    db_reset
  ;;

  *)
    echo "Usage: $0 [dev|build]"
    exit 1
    ;;
esac