import { PromptCopy } from '../../../modules/expo-enclave'

export const ACCOUNT_NAME: string = 'exampleAccount'
export const HEX_MESSAGE: string = '48656c6c6f2c20776f726c6421'

export const PROMPT_COPY: PromptCopy = {
  usageMessage: 'Please authenticate to continue.',
  androidTitle: 'Authentication Required',
}
export const ERC20_ADDRESS: string =
  '0x0641a7e12c43701d4b437468b5047a2e748e5f6a7f562395262cf6f60645d397'
export const ACCOUNT_ADDRESS: string =
  '0x14d781e241ef4edf92e231d50407c5e6cd03d9922e0abe6f4c271607a140f74'

export const RPC_ENDPOINT = 'https://0d84-189-120-76-5.ngrok-free.app'

export const ABI = [
  {
    type: 'impl',
    name: 'SimpleStorage',
    interface_name: 'zap_contracts::simple_contracts::simple_storage::ISimpleStorage',
  },
  {
    type: 'interface',
    name: 'zap_contracts::simple_contracts::simple_storage::ISimpleStorage',
    items: [
      {
        type: 'function',
        name: 'set',
        inputs: [{ name: 'x', type: 'core::integer::u128' }],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'get',
        inputs: [],
        outputs: [{ type: 'core::integer::u128' }],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'event',
    name: 'zap_contracts::simple_contracts::simple_storage::SimpleStorage::Event',
    kind: 'enum',
    variants: [],
  },
]
