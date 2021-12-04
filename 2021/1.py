numbers = []
with open('1.txt') as file:
    for line in file:
        numbers.append(line)

prevSum = int(numbers[0]) + int(numbers[1]) + int(numbers[2])
count = 0
for n in range(0, len(numbers) - 2):
    currentSum = int(numbers[n]) + int(numbers[n + 1]) + int(numbers[n + 2])
    if currentSum > prevSum:
        count += 1
    prevSum = currentSum
print(count)