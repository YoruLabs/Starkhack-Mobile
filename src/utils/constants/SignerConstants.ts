import { PromptCopy } from '../../../modules/expo-enclave'

export const HEX_MESSAGE: string = '48656c6c6f2c20776f726c6421'

export const PROMPT_COPY: PromptCopy = {
  usageMessage: 'Please authenticate to continue.',
  androidTitle: 'Authentication Required',
}
export const ERC20_ADDRESS: string =
  '0x073e845788e218a994419c7d6659ef0842bfc39c9e83d22461be9342bc77cabb'

export const RPC_ENDPOINT = 'https://4ef04e26a539.ngrok.app'
export const BACKEND_ENDPOINT = 'https://965715741e22.ngrok.app'

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
