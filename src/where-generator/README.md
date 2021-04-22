# Where generanor
## getConditions(somethingObject)
Принимает только не пустой объект

```sh
somethingObject = {
    a: 1
}
// WHERE a = 1
```
```sh
somethingObject = {
    a: {
        [Op.eq]: 1
    }
}
// WHERE a = 1
```
```sh
somethingObject = {
    a: 1,
    b: 2
}
// WHERE a = 1 AND b = 2
```
```sh
somethingObject = {
    [Op.and]: [
        a: 1,
        b: 2
    ]
}
// WHERE a = 1 AND b = 2
```
```sh
somethingObject = {
    [Op.or]: [
        a: 1,
        b: 2
    ]
}
// WHERE a = 1 OR b = 2
```

