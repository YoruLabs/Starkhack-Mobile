from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization
from pyasn1.type import univ
from pyasn1.codec.der import decoder

# P-256 curve parameters
p = 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff
a = 0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc
b = 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b
n = 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551

# Public key
pub_key_hex = "3059301306072a8648ce3d020106082a8648ce3d0301070342000440bf8647c6fa6ca23a971b1152e725e9216e6288ae64b7e6da8dbd4c01a4c03512ed006417ad80c47324fba97f0914221dfc896ad96147820380cafcdb67f5d4"


def get_pubkey_point(pub_key_der):
    """
    Extracts the x and y coordinates of the public key point from the DER format.
    """
    public_key = serialization.load_der_public_key(pub_key_der, ec.SECP256R1())
    x = public_key.public_numbers().x
    y = public_key.public_numbers().y
    return x, y

def is_on_curve(x, y):
    """
    Check if the point (x, y) is on the P-256 elliptic curve
    """
    left = (y * y) % p
    right = (x * x * x + a * x + b) % p
    return left == right


# Convert the public key hex to bytes
pub_key_der = bytes.fromhex(pub_key_hex)

# Extract the x and y coordinates of the public key point
x, y = get_pubkey_point(pub_key_der)
print(f"Public key point: ({x}, {y})")

if is_on_curve(x, y):
    print("The public key point is on the P-256 curve.")
else:
    print("The public key point is not on the P-256 curve.")