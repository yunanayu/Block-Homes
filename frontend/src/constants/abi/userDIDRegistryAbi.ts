export const USER_DID_REGISTRY_ABI = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
    ],
    'name': 'OwnableInvalidOwner',
    'type': 'error',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address',
      },
    ],
    'name': 'OwnableUnauthorizedAccount',
    'type': 'error',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'did',
        'type': 'string',
      },
    ],
    'name': 'DIDCreated',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'did',
        'type': 'string',
      },
    ],
    'name': 'DIDDeleted',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'previousOwner',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'OwnershipTransferred',
    'type': 'event',
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': '_publicKey',
        'type': 'string',
      },
    ],
    'name': 'createDIDDocument',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'did',
        'type': 'string',
      },
    ],
    'name': 'deleteDIDDocument',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'did',
        'type': 'string',
      },
    ],
    'name': 'getDIDDocument',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'string',
            'name': 'context',
            'type': 'string',
          },
          {
            'internalType': 'string',
            'name': 'id',
            'type': 'string',
          },
          {
            'components': [
              {
                'internalType': 'string',
                'name': 'id',
                'type': 'string',
              },
              {
                'internalType': 'string',
                'name': 'keyType',
                'type': 'string',
              },
              {
                'internalType': 'string',
                'name': 'controller',
                'type': 'string',
              },
              {
                'internalType': 'string',
                'name': 'publicKeyHex',
                'type': 'string',
              },
            ],
            'internalType': 'struct DIDStruct.PublicKey',
            'name': 'publicKey',
            'type': 'tuple',
          },
          {
            'internalType': 'string',
            'name': 'authentication',
            'type': 'string',
          },
          {
            'components': [
              {
                'internalType': 'string',
                'name': 'id',
                'type': 'string',
              },
              {
                'internalType': 'string',
                'name': 'serviceType',
                'type': 'string',
              },
              {
                'internalType': 'string',
                'name': 'serviceEndPoint',
                'type': 'string',
              },
            ],
            'internalType': 'struct DIDStruct.Service',
            'name': 'service',
            'type': 'tuple',
          },
        ],
        'internalType': 'struct DIDStruct.DIDDocument',
        'name': '',
        'type': 'tuple',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'did',
        'type': 'string',
      },
    ],
    'name': 'getTaxContractAddress',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
]