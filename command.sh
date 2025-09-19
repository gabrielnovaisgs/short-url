command=${1:-"dev"}

case $command in
  dev)
    docker compose -f infra/compose.dev.yml up -d && \
    pnpm -r start:dev
    ;;
  build)
    pnpm build --filter front --filter back
    ;;
  *)
    echo "Usage: $0 [dev|build]"
    exit 1
    ;;
esac