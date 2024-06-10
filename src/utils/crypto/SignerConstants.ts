import { PromptCopy } from '../../../modules/expo-enclave'

export const ACCOUNT_NAME: string = 'exampleAccount'
export const HEX_MESSAGE: string = '48656c6c6f2c20776f726c6421'

export const PROMPT_COPY: PromptCopy = {
  usageMessage: 'Please authenticate to continue.',
  androidTitle: 'Authentication Required',
}
export const ERC20_ADDRESS: string =
  '0x05c83bb160db54805f9cb6cc0e9624e5ed9fc78680f957d2827a1970d95869b4'
export const ACCOUNT_ADDRESS: string =
  '0x15ed3e955161432ff55d43717e8c44c7ee4cce8dff91f10d1833969909e3d86'

export const RPC_ENDPOINT = 'https://4fc9-189-120-76-5.ngrok-free.app'

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
