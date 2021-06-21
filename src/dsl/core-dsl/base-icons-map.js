export const WORKFLOW_KIND = 'workflow';
export const WORKFLOW_PROVIDER = 'default';

export const BASE_ICONS_MAP = new Map([
  ['fanOut_fanIn', { className: 'fanOut_fanIn', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut_fanIn-diagram-3-fill.svg' }],
  ['choice', { className: 'choice', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut_fanIn-diagram-3-fill.svg' }],
  ['fanIn', { className: 'fanIn', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanIn-diagram-3-fill.svg' }],
  ['merge', { className: 'merge', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanIn-diagram-3-fill.svg' }],
  ['fanOut', { className: 'fanOut', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut-diagram-3-fill.svg' }],
  ['branch', { className: 'branch', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut-diagram-3-fill.svg' }],
  ['split', { className: 'split', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut-diagram-3-fill.svg' }],
  ['tree', { className: 'tree', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut-diagram-3-fill.svg' }],
  ['link', { className: 'link', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut-diagram-3-fill.svg' }],
  ['use', { className: 'use', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut-diagram-3-fill.svg' }],
  ['parallel', { className: 'parallel', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/fanOut-diagram-3-fill.svg' }],
  ['optional', { className: 'optional', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/optional-question-square-fill.svg' }],
  ['repeat', { className: 'repeat', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/repeat-bootstrap-reboot.svg' }],
  ['sequence', { className: 'sequence', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/sequence-diagram-3-fill.svg' }],
  ['resource', null],
  ['state', null],
  ['zeroOrMore', { className: 'zeroOrMore', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/repeat-bootstrap-reboot.svg' }],
  ['oneOrMore', { className: 'oneOrMore', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/repeat-bootstrap-reboot.svg' }],
  ['group', { className: 'group', provider: WORKFLOW_PROVIDER, iconURL: 'assets/icons/base/group-grid-fill.svg' }]
]
);