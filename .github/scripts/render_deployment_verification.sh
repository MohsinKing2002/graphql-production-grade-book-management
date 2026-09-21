#!/bin/bash

set -e

render_deployment_verification_script(){
    local service_name="$1"
    local service_id="$2"
    local deploy_id="$3"

    echo "================================================="
    echo "Waiting for $service_name deployment"
    echo "Deploy ID: $deploy_id"
    echo "================================================="

    for i in {1..30}; do
        response=$(curl --fail --silent \
            -H "Authorization: Bearer $RENDER_API_KEY" \
            https://api.render.com/v1/services/$service_id/deploys/$deploy_id")
        
        status=$(echo "$response" | jq -r '.status')

        echo "Attempt $i/30 → status: $status"

        if [ "$status" = "live" ]; then
            echo "✅ $service_name deployment successful"
            return 0
        fi

        if [ "$status" = "failed" ] || [ "$status" = "canceled" ]; then
            echo "❌ $service_name deployment failed"
            echo "$response"
            return 1
        fi

        sleep 10
    done

    echo "❌ $service_name deployment timed out"
    return 1
}

render_deployment_verification_script "$1" "$2" "$3"