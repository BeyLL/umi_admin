/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-12 09:17:25
 * @Description: 工具方法
 * @LastEditTime: 2021-01-29 13:37:06
 */

//菜单栏数据重组
export const reorganize = (mainMenues, parentId, childId) => {
  if (!mainMenues || !mainMenues.length) return;

  let residueLists = [];
  residueLists = mainMenues.reduce((prev, cur) => {
    cur.children = [];
    const choiceLists = mainMenues.filter(item => item[parentId] === cur[childId]);
    if (choiceLists && choiceLists.length) cur.children = choiceLists;
    prev.push(cur);
    return prev;
  }, []).filter(current => !current[parentId]);

  console.log(residueLists)

  return residueLists;
};



/**
 * 表单参数处理
 * @param body
 * @returns {*}
 */
export const formData = (body) => {
    let form = new FormData();
    for (let i in body) form.append(i, body[i] == undefined ? "" : body[i]);
    return form;
  }
  