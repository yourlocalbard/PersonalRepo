#So the theorem is as follows:
#If even: x/2
#If odd: 3x + 1
print("=====================================================================")
print("Welcome to the Collatz Conjecture Program")
roundCount = int(1)
integer = int(input("Please select a positive integer: "))
print(integer)
while(integer > 1):
    if(integer % 2 != 0):
        integer = 3 * integer + 1
        #We use the .format to make sure we can actually print the integers
        printableCounter = "{roundcount}"
        printableInteger = "{value}"
        print(printableCounter.format(roundcount=roundCount) + ") " + printableInteger.format(value=integer))
        roundCount = roundCount + 1
    if(integer % 2 == 0):
        integer = integer / 2
        printableCounter = "{roundcount}"
        printableInteger = "{value}"
        print(printableCounter.format(roundcount=roundCount) + ") " + printableInteger.format(value=integer))
        roundCount = roundCount + 1
#This was used to be a confirmation that the conjecture ends
#if(integer == 1):
#    integer = 3 * integer + 1
#    print(integer)
#    integer = integer / 2
#    print(integer)
#    integer = integer / 2
#    print(integer)

printInt = str(roundCount - 1)
print("=====================================================================")
print("This theorem runs " + printInt + " times before terminating")
print(" ")
print("Thank you for using this program!")
print("=====================================================================")
