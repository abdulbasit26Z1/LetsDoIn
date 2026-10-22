function classExtend(Child, Parent) {
  Child.prototype = classInherit(Parent.prototype)
  Child.prototype.constructor = Child
  Child.parent = Parent.prototype
}

function classInherit(proto) {
  function F() {}
  F.prototype = proto
  return new F
}
