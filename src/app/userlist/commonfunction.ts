export const renderFinalPayload = async (item: any) => {
  const payloadFinal = {
    username: item.username,
    password: item.password,
    email: item.email,
    createdDate: item.createdDate ?? null,
    updateDate: item.updateDate ?? null,
    createdBy: item.createdBy,
    updateBy: item.updateBy,
    roleId:item.roleId,
    isActive: String(item.isActive).toLowerCase() === "true",
    detail: {
      name: item.detail.name,
      phone: item.detail.phone,
      gender: item.detail.gender,
      address: item.detail.address,
      position: item.detail.position,
      createdDate: item.detail.createdDate ?? null,
      updateDate: item.detail.updateDate ?? null,
      createdBy: item.detail.createdBy,
      updateBy: item.detail.updateBy
    }
  }
  return payloadFinal
}

export const renderRoleBody = async (item: any) => {
  const payloadFinal = {
    roleName: item.roleName,
    isActive: String(item.isActive).toLowerCase() === "true",
    createdBy: item.createdBy,
    updateBy: item.updateBy,
    access: {
      view: item.access === undefined ? false : item.access.view,
      edit: item.access === undefined ? false : item.access.edit,
      absent: item.access === undefined ? false : item.access.absent
    }
  }
  return payloadFinal
}
