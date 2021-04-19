## Operators

-EQ =
-NE !=
-GE >=
-LE <=
-GT >
-LT <

## Examples

### Input

example: {
  key: 'id',
  operator: 'EQ',
  value: '35001234' 
}

where: {
  example 
}

### Output

WHERE id = '35001234'

### Input

example1: {
  key: 'id',
  operator: 'EQ',
  value: '35001234' 
}

example2: {
  key: 'id',
  operator: 'EQ',
  value: '35005678' 
}

where: {
  [
    example1,
    example2
  ]
  and: false
}

### Output

WHERE id = '35001234' OR id = '35005678'

### Input

example1: {
  key: 'id',
  operator: 'EQ',
  value: '35001234' 
}

example2: {
  key: 'id',
  operator: 'EQ',
  value: '35005678' 
}

example3: {
  key: 'age',
  operator: 'GE',
  value: '25' 
}

where: {
  {
    [
      example1,
      example2
    ]
    and: false
  },
  example3,
  and: true
}

### Output

WHERE (id = '35001234' OR id = '35005678') AND age >= '25'
