- name: Build & Push Frontend Image
  run: |
    IMAGE=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/tipspay-frontend:${ENVIRONMENT}
    docker buildx build \
      --cache-from type=local,src=/tmp/.buildx-cache \
      --cache-to type=local,dest=/tmp/.buildx-cache,mode=max \
      -f frontend/Dockerfile \
      frontend \
      -t $IMAGE \
      --load
    docker push $IMAGE
