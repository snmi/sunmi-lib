/**
 * [mapChildrenToView description]
 * @param  {[array]} children [description]
 * @return {[object]}          [view对象]
 */
export default function mapChildrenToView(children) {

  if (children instanceof Array) {

    let view = {}

    children.map((item, index) => {

      if (item.key) {
        view[item.key] = item
      } else {
        view[index] = item
      }

    })

    return view

  } else {

    return children

    // throw new Error(
    //   `mapChildrenToView错误，${children.type.name || JSON.stringify(children)}不是一个array`
    // )

  }
}
