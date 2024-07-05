import { PromptCopy } from '../../../modules/expo-enclave'

export const HEX_MESSAGE: string = '48656c6c6f2c20776f726c6421'

export const PROMPT_COPY: PromptCopy = {
  usageMessage: 'Please authenticate to continue.',
  androidTitle: 'Authentication Required',
}

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
