#!/bin/bash
case "$1" in
  "dev")
    cd client && npx vite --host 0.0.0.0 --port 5173
    ;;
  "build")
    cd client && npx vite build
    ;;
  "preview")
    cd client && npx vite preview --host 0.0.0.0 --port 4173
    ;;
  *)
    echo "Usage: ./vite-scripts.sh [dev|build|preview]"
    echo "  dev     - Start development server"
    echo "  build   - Build for production"
    echo "  preview - Preview production build"
    ;;
esac
