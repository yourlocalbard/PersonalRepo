import random
def showMenu():
    print("=== Please select what dice you need to roll based on the corresponding number ===")
    print("1) d4")
    print("2) d6")
    print("3) d8")
    print("4) d10")
    print("5) d12")
    print("6) d20")
    print("7) d100")
def diceRoll():
    total = 0
    diceType = int(input("Dice Selection: "))
    while int(diceType) > 7 or int(diceType) < 1:
        print("ERROR: INVALID INPUT")
        diceType = int(input("Dice Selection: "))
    print("")
    print("=== Please select how many you would like to roll ===")
    diceAmount = int(input("Dice Amount: "))
    print("")
    if diceType == 1:
        for i in range(diceAmount):
            roll = random.randint(1, 4)
            print("Roll: ", roll)
            total = roll + total
        print("Total: ", total)
    if diceType == 2:
        for i in range(diceAmount):
            roll = random.randint(1, 6)
            print("Roll: ", roll)
            total = roll + total
        print("Total: ", total)
    if diceType == 3:
        for i in range(diceAmount):
            roll = random.randint(1, 8)
            print("Roll: ", roll)
            total = roll + total
        print("Total: ", total)
    if diceType == 4:
        for i in range(diceAmount):
            roll = random.randint(1, 10)
            print("Roll: ", roll)
            total = roll + total
        print("Total: ", total)
    if diceType == 5:
        for i in range(diceAmount):
            roll = random.randint(1, 12)
            print("Roll: ", roll)
            total = roll + total
        print("Total: ", total)
    if diceType == 6:
        for i in range(diceAmount):
            roll = random.randint(1, 20)
            print("Roll: ", roll)
            total = roll + total
        print("Total: ", total)
    if diceType == 7:
        for i in range(diceAmount):
            roll = random.randint(1, 100)
            print("Roll: ", roll)
            total = roll + total
        print("Total: ", total)
def cont():
    print(" ")
    keep = input("Would you like to make another roll? (y/n): ")
    while keep != "y" and keep != "n":
        print("ERROR: INVALID INPUT")
        keep = input("Would you like to make another roll? (y/n): ")
    if keep == "y":
        showMenu()
        diceRoll()
        cont()
    if keep == "n":
        print("Ending Program...")
def main():
    print("Welcome to Dice Roller")
    keep = "y"
    while keep == "y":
        showMenu()
        diceRoll()
        cont()
        break
main()