import math

#So the theorem is as follows:
#If even: x/2
#If odd: 3x + 1

def selectInput():
    integer = int(input("Please select a positive integer: "))
    print(integer)
    while(integer > 1):
        if(integer % 2 != 0):
            integer = 3 * integer + 1
            print(integer)
        if(integer % 2 == 0):
            integer = integer / 2
            print(integer)
    if(integer == 1):
        integer = 3 * integer + 1
        print(integer)
        integer = integer / 2
        print(integer)
        integer = integer / 2
        print(integer)

    print("Thank you for using this program!")

def main():
    print("Welcome to the Collatz Conjecture Program")
    selectInput()


main()
