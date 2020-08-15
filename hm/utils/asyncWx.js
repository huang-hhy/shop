export const getSetting=()=>{
	return new Promise((resolve,reject)=>{
		wx.getSetting({
			success:(result)=>{
				resolve(result);
			},
			fail:(err)=>{
				reject(err);
			},
		});
	})
}

export const scopeAddress=()=>{
	return new Promise((resolve,reject)=>{
		wx.scopeAddress({
			success:(result)=>{
				resolve(result);
			},
			fail:(err)=>{
				reject(err);
			},
		});
	})
}

export const openSetting=()=>{
	return new Promise((resolve,reject)=>{
		wx.openSetting({
			success:(result)=>{
				resolve(result);
			},
			fail:(err)=>{
				reject(err);
			},
		});
	})
}

export const showToast=({title})=>{
	return new Promise((resolve,reject)=>{
		wx.showToast({
			title:title,
			icon:'none',
			success:(result)=>{
				resolve(result);
			},
			fail:(err)=>{
				reject(err);
			}
		})
	})
}

