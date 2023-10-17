import createClient from 'openapi-fetch'
import { paths } from '@/repository/@types/xsollaStore'

export const xsollaStoreInstance = createClient<paths>({ baseUrl: 'https://store.xsolla.com/api' })

// https://api.redocly.com/registry/bundle/xsolla/igs-bb-api/v1/openapi.yaml
