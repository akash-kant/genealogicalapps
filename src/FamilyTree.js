import { useState } from 'react';
import { PlusCircle, Trash2, Eye, Edit2, Lock, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'; // Adjust based on actual path
import { Button } from './components/ui/button'; // Adjust based on actual path
import { Input } from './components/ui/input'; // Adjust based on actual path
import { Alert, AlertDescription } from './components/ui/alert'; // Adjust based on actual path


// Sample family member data structure with gender
const initialFamilyData = {
  id: '1',
  name: 'John Smith',
  birthDate: '1950-01-01',
  gender: 'male',
  children: [
    {
      id: '2',
      name: 'Mary Johnson',
      birthDate: '1975-05-15',
      gender: 'female',
      children: [
        {
          id: '4',
          name: 'Tom Johnson',
          birthDate: '2000-03-20',
          gender: 'male',
          children: []
        }
      ]
    },
    {
      id: '3',
      name: 'James Smith',
      birthDate: '1978-08-22',
      gender: 'male',
      children: []
    }
  ]
};

const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be stored securely

const FamilyTree = () => {
  const [familyData, setFamilyData] = useState(initialFamilyData);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', birthDate: '', gender: 'male' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);

  // Function to find all descendants of a member
  const findDescendants = (memberId) => {
    const descendants = new Set();
    
    const traverse = (node) => {
      if (!node) return;
      if (node.id === memberId) {
        node.children?.forEach(child => {
          descendants.add(child.id);
          traverse(child);
        });
      } else {
        node.children?.forEach(child => traverse(child));
      }
    };

    traverse(familyData);
    return descendants;
  };

  const handleAdminLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPassword('');
  };

  // Function to delete a family member
  const deleteMember = (memberId) => {
    const deleteRecursively = (members) => {
      return members.filter(member => {
        if (member.id === memberId) return false;
        member.children = deleteRecursively(member.children);
        return true;
      });
    };

    setFamilyData(prevData => ({
      ...prevData,
      children: deleteRecursively(prevData.children)
    }));
  };

  // Function to add a new family member
  const addChild = (parentId) => {
    const newId = (Math.random() + 1).toString(36).substring(7); // Generate a random ID
    const newMemberData = {
      id: newId,
      name: newMember.name,
      birthDate: newMember.birthDate,
      gender: newMember.gender,
      children: []
    };

    const addChildToFamily = (members) => {
      return members.map(member => {
        if (member.id === parentId) {
          member.children.push(newMemberData);
        } else {
          member.children = addChildToFamily(member.children);
        }
        return member;
      });
    };

    setFamilyData(prevData => ({
      ...prevData,
      children: addChildToFamily(prevData.children)
    }));

    setNewMember({ name: '', birthDate: '', gender: 'male' }); // Reset the input fields
    setIsAdding(false); // Close the add member form
  };

  const FamilyMember = ({ member, isDescendant }) => {
    const isHighlighted = hoveredMember === member.id;
    const isRelated = isDescendant;

    const cardStyle = {
      backgroundColor: member.gender === 'male' ? 'rgba(219, 234, 254, 0.8)' : 'rgba(252, 231, 243, 0.8)',
      transform: isHighlighted || isRelated ? 'scale(1.05)' : 'scale(1)',
      transition: 'all 0.3s ease',
      border: isHighlighted || isRelated ? '2px solid #3b82f6' : '1px solid #e5e7eb'
    };

    return (
      <div className="flex flex-col items-center mb-4">
        <Card 
          className="w-64 mb-2"
          style={cardStyle}
          onMouseEnter={() => setHoveredMember(member.id)}
          onMouseLeave={() => setHoveredMember(null)}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{member.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Born: {member.birthDate}</p>
            <p className="text-sm text-gray-600">Gender: {member.gender}</p>
            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedMember(member)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              {isAdmin && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsAdding(true);
                      setSelectedMember(member);
                    }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  {member.id !== '1' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteMember(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
        {member.children && member.children.length > 0 && (
          <div className="flex gap-4">
            {member.children.map(child => (
              <FamilyMember 
                key={child.id} 
                member={child} 
                isDescendant={hoveredMember === member.id}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Family Tree</h1>
        {!isAdmin ? (
          <Button onClick={() => setShowAdminLogin(true)}>
            <Lock className="h-4 w-4 mr-2" />
            Admin Login
          </Button>
        ) : (
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        )}
      </div>

      {showAdminLogin && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleAdminLogin}>Login</Button>
              <Button variant="outline" onClick={() => setShowAdminLogin(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isAdmin && (
        <Alert className="mb-4">
          <AlertDescription>
            You are in admin mode. You can now add and delete family members.
          </AlertDescription>
        </Alert>
      )}

      {selectedMember && !isAdding && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {selectedMember.name}</p>
            <p><strong>Birth Date:</strong> {selectedMember.birthDate}</p>
            <p><strong>Gender:</strong> {selectedMember.gender}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSelectedMember(null)}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}

      {isAdmin && isAdding && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add New Family Member</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
              <Input
                type="date"
                value={newMember.birthDate}
                onChange={(e) => setNewMember({ ...newMember, birthDate: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded"
                value={newMember.gender}
                onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <Button
                onClick={() => addChild(selectedMember.id)}
                className="w-full"
              >
                Add Member
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <FamilyMember member={familyData} />
      </div>
    </div>
  );
};

export default FamilyTree;
