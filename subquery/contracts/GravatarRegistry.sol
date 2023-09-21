// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract GravatarRegistry {
  event NewGravatar(uint id, address owner, string displayName, string imageUrl);
  event UpdatedGravatar(uint id, address owner, string displayName, string imageUrl);

  struct Gravatar {
    address owner;
    string displayName;
    string imageUrl;
  }

  Gravatar[] public gravatars;

  mapping (uint => address) public gravatarToOwner;
  mapping (address => uint) public ownerToGravatar;

  constructor() {
    // Create a dummy gravatar at index 0
    gravatars.push(Gravatar(address(0x0), " ", " "));
  }

  function createGravatar(string memory _displayName, string memory _imageUrl) public {
    require(ownerToGravatar[msg.sender] == 0, '<createGravatar> owner already has a gravatar');
    Gravatar memory newGravatar = Gravatar(msg.sender, _displayName, _imageUrl);
    gravatars.push(newGravatar);
    uint id = gravatars.length - 1;

    gravatarToOwner[id] = msg.sender;
    ownerToGravatar[msg.sender] = id;

    emit NewGravatar(id, msg.sender, _displayName, _imageUrl);
  }

  function getGravatar(address owner) public view returns (string memory, string memory) {
    uint id = ownerToGravatar[owner];
    return (gravatars[id].displayName, gravatars[id].imageUrl);
  }

  function updateGravatarName(string memory _displayName) public {
    require(ownerToGravatar[msg.sender] != 0, '<updateGravatarName> sender does not have a gravatar');
    require(msg.sender == gravatars[ownerToGravatar[msg.sender]].owner, '<updateGravatarName> sender is not the owner');

    uint id = ownerToGravatar[msg.sender];

    gravatars[id].displayName = _displayName;
    emit UpdatedGravatar(id, msg.sender, _displayName, gravatars[id].imageUrl);
  }

  function updateGravatarImage(string memory _imageUrl) public {
    require(ownerToGravatar[msg.sender] != 0, '<updateGravatarImage> sender does not have a gravatar');
    require(msg.sender == gravatars[ownerToGravatar[msg.sender]].owner, '<updateGravatarImage> sender is not the owner');

    uint id = ownerToGravatar[msg.sender];

    gravatars[id].imageUrl = _imageUrl;
    emit UpdatedGravatar(id, msg.sender, gravatars[id].displayName, _imageUrl);
  }
}
