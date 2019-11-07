function adjustMenu(menu,pid) {
  //处理菜单地址
  var adjusted = [];
  if (menu && menu.length > 0) {
    menu = Object.assign([], menu);
    menu.forEach((v, i) => {
      if( v.name && v.id > 0 ){
        adjusted.push({
          name: v.frontUrl,
          title: v.name,
          id: v.id,
          cur: false,
          parent: pid ? pid : 0,
          describe: "/" + v.frontUrl,
          icon: v.icon,
          children: (v.childSysMenuEntities && v.childSysMenuEntities.length > 0) ? adjustMenu(v.childSysMenuEntities,v.id) : []
        });
      }
    });
  }
  return adjusted;
}

export { adjustMenu };