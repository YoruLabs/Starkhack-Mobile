import { PromptCopy } from '../../../modules/expo-enclave'

export const ACCOUNT_NAME: string = 'danilowhk'
export const HEX_MESSAGE: string = '48656c6c6f2c20776f726c6421'

export const PROMPT_COPY: PromptCopy = {
  usageMessage: 'Please authenticate to continue.',
  androidTitle: 'Authentication Required',
}
export const ERC20_ADDRESS: string =
  '0x0592e877b1bd580c408849a29f0469ea8efa872f6accd2689048210ac5697a3f'
export const ACCOUNT_ADDRESS: string =
  '0x1c4690a1332bbcc70745de5be2780fbb522feeb74a9875004d610dc38cfb50'

export const RPC_ENDPOINT = 'https://0e01-189-120-76-5.ngrok-free.app'

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
