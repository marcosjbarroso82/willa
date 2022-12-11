// SPDX-License-Identifier: MIT
// Contranct for multiple escrow
pragma solidity >=0.4.22 <0.9.0;

contract MultiEscrow {
    address public owner;
    uint public numEscrows;
    mapping (uint => Escrow) public escrows;
    mapping (address => uint) public balances;

    struct Escrow {
        address buyer;
        address seller;
        uint amount;
        bool buyerApproved;
        bool sellerApproved;
    }

    event Deposit(address indexed _from, uint _amount);
    event Withdraw(address indexed _to, uint _amount);
    event EscrowCreated(uint _escrowId, address indexed _buyer, address indexed _seller, uint _amount);
    event EscrowApproved(uint _escrowId, address indexed _approver);
    event EscrowCompleted(uint _escrowId, address indexed _buyer, address indexed _seller, uint _amount);

    constructor() public {
        owner = msg.sender;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] -= _amount;
        msg.sender.transfer(_amount);
        emit Withdraw(msg.sender, _amount);
    }

    function createEscrow(address _seller, uint _amount) public {
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] -= _amount;
        escrows[numEscrows] = Escrow(msg.sender, _seller, _amount, false, false);
        emit EscrowCreated(numEscrows, msg.sender, _seller, _amount);
        numEscrows++;
    }

    function approveEscrow(uint _escrowId) public {
        require(msg.sender == escrows[_escrowId].buyer || msg.sender == escrows[_escrowId].seller);
        if (msg.sender == escrows[_escrowId].buyer) {
            escrows[_escrowId].buyerApproved = true;
        } else {
            escrows[_escrowId].sellerApproved = true;
        }
        emit EscrowApproved(_escrowId, msg.sender);
        if (escrows[_escrowId].buyerApproved && escrows[_escrowId].sellerApproved) {
            balances[escrows[_escrowId].buyer] += escrows[_escrowId].amount;
            emit EscrowCompleted(_escrowId, escrows[_escrowId].buyer, escrows[_escrowId].seller, escrows[_escrowId].amount);
        }
    }
}
