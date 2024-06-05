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
    name: 'ICounterImpl',
    type: 'impl',
    interface_name: 'counter::counter::ICounter',
  },
  {
    name: 'counter::counter::ICounter',
    type: 'interface',
    items: [
      {
        name: 'get_counter',
        type: 'function',
        inputs: [],
        outputs: [
          {
            type: 'core::integer::u32',
          },
        ],
        state_mutability: 'view',
      },
      {
        name: 'increase_counter',
        type: 'function',
        inputs: [],
        outputs: [],
        state_mutability: 'external',
      },
    ],
  },
  {
    name: 'constructor',
    type: 'constructor',
    inputs: [
      {
        name: 'input',
        type: 'core::integer::u32',
      },
    ],
  },
  {
    kind: 'struct',
    name: 'counter::counter::Counter::CounterIncreased',
    type: 'event',
    members: [
      {
        kind: 'key',
        name: 'counter',
        type: 'core::integer::u32',
      },
    ],
  },
  {
    kind: 'enum',
    name: 'counter::counter::Counter::Event',
    type: 'event',
    variants: [
      {
        kind: 'nested',
        name: 'CounterIncreased',
        type: 'counter::counter::Counter::CounterIncreased',
      },
    ],
  },
]
