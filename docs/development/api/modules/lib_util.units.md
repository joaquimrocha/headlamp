---
title: "Namespace: units"
linkTitle: "units"
slug: "lib_util.units"
---

[lib/util](lib_util.md).units

## Variables

### TO\_GB

• `Const` **TO\_GB**: `number`

#### Defined in

[lib/units.ts:10](https://github.com/kinvolk/headlamp/blob/f70c8787/frontend/src/lib/units.ts#L10)

___

### TO\_ONE\_CPU

• `Const` **TO\_ONE\_CPU**: ``1000000000``

#### Defined in

[lib/units.ts:12](https://github.com/kinvolk/headlamp/blob/f70c8787/frontend/src/lib/units.ts#L12)

___

### TO\_ONE\_M\_CPU

• `Const` **TO\_ONE\_M\_CPU**: ``1000000``

#### Defined in

[lib/units.ts:11](https://github.com/kinvolk/headlamp/blob/f70c8787/frontend/src/lib/units.ts#L11)

## Functions

### parseCpu

▸ **parseCpu**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`number`

#### Defined in

[lib/units.ts:62](https://github.com/kinvolk/headlamp/blob/f70c8787/frontend/src/lib/units.ts#L62)

___

### parseDiskSpace

▸ **parseDiskSpace**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`number`

#### Defined in

[lib/units.ts:14](https://github.com/kinvolk/headlamp/blob/f70c8787/frontend/src/lib/units.ts#L14)

___

### parseRam

▸ **parseRam**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`number`

#### Defined in

[lib/units.ts:18](https://github.com/kinvolk/headlamp/blob/f70c8787/frontend/src/lib/units.ts#L18)

___

### unparseCpu

▸ **unparseCpu**(`value`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `unit` | `string` |
| `value` | `number` |

#### Defined in

[lib/units.ts:72](https://github.com/kinvolk/headlamp/blob/f70c8787/frontend/src/lib/units.ts#L72)

___

### unparseRam

▸ **unparseRam**(`value`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `unit` | `string` |
| `value` | `number` |

#### Defined in

[lib/units.ts:49](https://github.com/kinvolk/headlamp/blob/f70c8787/frontend/src/lib/units.ts#L49)
