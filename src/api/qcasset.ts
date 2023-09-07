import { type apiConfig } from '@/plugins/autoImport/$api'

const prefix = '/qcasset'

export const qcAssetList: apiConfig = { url: `${prefix}/qcpgAssetPkg/list` }

export const qcAssetListExport: apiConfig = {
  url: `${prefix}/qcpgAssetPkg/exportXls`,
  responseType: 'blob',
}
