export const renderFinalPayload=async(item:any)=>{
    console.log(item.createdDate)
    console.log(item.updateDate)
    console.log("WEW")
    const payloadFinal = {
      username: item.username,
      password: item.password,
      email: item.email,
      createdDate: item.createdDate ?? null,
      updateDate: item.updateDate ?? null,
      createdBy: item.createdBy,
      updateBy: item.updateBy,
      isActive: item.isActive==="true" ? true:false,
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