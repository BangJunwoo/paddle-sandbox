import createClient from 'openapi-fetch'
import { paths as storePaths } from '@/repository/@types/xsollaStore'
import { paths as loginPaths } from '@/repository/@types/xsollaStore'

export const xsollaStoreInstance = createClient<storePaths>({ baseUrl: 'https://store.xsolla.com/api' })
export const xsollaLoginInstance = createClient<loginPaths>({ baseUrl: 'https://login.xsolla.com/api' })

// https://api.redocly.com/registry/bundle/xsolla/igs-bb-api/v1/openapi.yaml
