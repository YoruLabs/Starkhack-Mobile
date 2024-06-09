import { PromptCopy } from '../../modules/expo-enclave'

export const ACCOUNT_NAME: string = 'exampleAccount'
export const HEX_MESSAGE: string = '48656c6c6f2c20776f726c6421'
export const TEST_ADDRESS: string =
  '0x4946d0ed1ec6f1ed9aff9744473b84af9c28d1b8adff36e5a8c94df67631266'
export const PROMPT_COPY: PromptCopy = {
  usageMessage: 'Please authenticate to continue.',
  androidTitle: 'Authentication Required',
}

export const DEPLOYER_ADDRESS: string =
  '0x0498546e6e9d4bd039f53ef8c3813bdc5bc8b6c10efd270b407aa13e0f9f696d'
export const ACCOUNT_ADDRESS: string =
  '0x1aef8470f8f64545901a21fdc341a64899a4e982494087618fd0c3abd2fd882'

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
