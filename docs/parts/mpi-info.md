[//]: # (### MpiInfo)

 <div class="custom-table bordered-table">

| 名称        | 类型     | 长度  | 必填  | 描述                                              |
|-----------|--------|-----|-----|-------------------------------------------------|
| eci       | String | 2   | Yes | 责任转移                                            |
| cavv      | String | 128 | Yes | 由发卡行创建                                          |
| xid       | String | 128 | No  | `3D-Secure` v1版本`Mpi`交易`id`（与`dsTransID`任选其一填写） |
| dsTransID | String | 128 | No  | `3D-Secure` v2版本Mpi交易`id`（与`xid`任选其一填写）         |

</div>