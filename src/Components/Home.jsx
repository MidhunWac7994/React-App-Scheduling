import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, X } from 'lucide-react';

const HomePage = () => {
  const [showRooms, setShowRooms] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const rooms = [
    { id: 1, name: "Conference Room A", capacity: 12, available: true },
    { id: 2, name: "Meeting Room B", capacity: 6, available: true },
    { id: 3, name: "Studio Room C", capacity: 4, available: true }
  ];

  const toggleRooms = () => {
    setIsAnimating(true);
    setShowRooms(!showRooms);
    setTimeout(() => setIsAnimating(false), 1000);
  };

const handleBookNow = (roomId) => {
  navigate(`/Cra/${roomId}`); 
};

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Split Background */}
      <div className="fixed inset-0 flex">
        <div className=" bg-white"></div>
        <div className="w-1/2 bg-black"></div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
    
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 transition-opacity duration-1000 ${showRooms ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        
        {/* Home Icon */}
        <button 
          onClick={toggleRooms}
          className={`relative z-10 bg-gray-800 p-6 rounded-full hover:bg-gray-700 transition-all duration-700 transform hover:scale-110 hover:shadow-lg ${
            isAnimating ? 'animate-pulse' : ''
          } ${
            showRooms ? 'scale-75 -translate-y-32' : 'scale-100'
          }`}
          disabled={isAnimating}
        >
          <Home size={48} className="text-white transition-all duration-700" />
        </button>
        <p className={`relative z-10 mt-4 text-gray-500 transition-all duration-500 ${
          showRooms ? 'opacity-0 -translate-y-32' : 'opacity-100'
        }`}>
          Click to view available rooms
        </p>
        
        {/* Rooms container with enhanced animations */}
        <div className={`absolute w-full max-w-3xl transition-all duration-1000 ease-out transform ${
          showRooms ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-64 pointer-events-none'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Available Rooms</h2>
            <button 
              onClick={toggleRooms}
              className="p-2 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:rotate-90"
              disabled={isAnimating}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <div 
                key={room.id} 
                className="bg-white text-black rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl"
                style={{ 
                  animation: showRooms 
                    ? `roomEnter 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.2}s both` 
                    : `roomExit 0.5s cubic-bezier(0.55, 0, 1, 0.45) ${(rooms.length - 1 - index) * 0.15}s both`
                }}
              >
                <div className="bg-black text-white p-3">
                  <h3 className="font-bold text-lg">{room.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">Capacity: {room.capacity}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-green-600 flex items-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Available
                    </span>
                    <button 
                      className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded text-sm transition-colors duration-300"
                      onClick={() => handleBookNow(room.id)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="p-4 border-t border-gray-800 text-center text-gray-500 relative z-10">
        <p>© 2025 WAC Cave Room Scheduling System</p>
      </footer>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes roomEnter {
          0% { 
            opacity: 0; 
            transform: translateY(100px) scale(0.8); 
          }
          60% { 
            transform: translateY(-20px) scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes roomExit {
          0% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(80px) scale(0.9); 
          }
        }
      `}</style>
    </div>
  );  
};

export default HomePage;