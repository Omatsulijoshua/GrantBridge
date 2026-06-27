/* src/context/AppContext.jsx */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS, INITIAL_GRANTS, INITIAL_APPLICATIONS, INITIAL_CATEGORIES } from '../utils/mockData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // --- Load Initial State from LocalStorage or seed data ---
  const [users, setUsers] = useState(() => {
    const local = localStorage.getItem('gb_users');
    return local ? JSON.parse(local) : INITIAL_USERS;
  });

  const [grants, setGrants] = useState(() => {
    const local = localStorage.getItem('gb_grants');
    return local ? JSON.parse(local) : INITIAL_GRANTS;
  });

  const [applications, setApplications] = useState(() => {
    const local = localStorage.getItem('gb_applications');
    return local ? JSON.parse(local) : INITIAL_APPLICATIONS;
  });

  const [categories, setCategories] = useState(() => {
    const local = localStorage.getItem('gb_categories');
    return local ? JSON.parse(local) : INITIAL_CATEGORIES;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const local = sessionStorage.getItem('gb_current_user');
    return local ? JSON.parse(local) : null;
  });

  const [theme, setThemeState] = useState(() => {
    const local = localStorage.getItem('gb_theme');
    return local || 'light';
  });

  const [toasts, setToasts] = useState([]);

  // --- Sync to LocalStorage ---
  useEffect(() => {
    localStorage.setItem('gb_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('gb_grants', JSON.stringify(grants));
  }, [grants]);

  useEffect(() => {
    localStorage.setItem('gb_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('gb_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('gb_current_user', JSON.stringify(currentUser));
      // Keep the user details in sync with the main users array
      const freshUser = users.find(u => u.id === currentUser.id);
      if (freshUser && JSON.stringify(freshUser) !== JSON.stringify(currentUser)) {
        setCurrentUser(freshUser);
      }
    } else {
      sessionStorage.removeItem('gb_current_user');
    }
  }, [currentUser, users]);

  // --- Apply Theme ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gb_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // --- Toast Manager ---
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // --- Authentication ---
  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      showToast('Account not found.', 'error');
      return false;
    }
    
    if (user.blocked) {
      showToast('Your account has been suspended. Contact support.', 'error');
      return false;
    }
    
    if (user.password !== password) {
      showToast('Invalid credentials.', 'error');
      return false;
    }

    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.');
  };

  const signup = (name, email, password, role, extraFields = {}) => {
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      showToast('Email already registered.', 'error');
      return false;
    }

    const newUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password,
      role,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      blocked: false,
      ...extraFields
    };

    if (role === 'student') {
      newUser.savedGrants = [];
      newUser.documents = [];
      newUser.profileCompleted = false;
    } else if (role === 'provider') {
      newUser.verified = false;
      newUser.subscription = 'Free';
      newUser.foundationName = extraFields.foundationName || name + ' Foundation';
    }

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast('Account created successfully!');
    return newUser;
  };

  const updateProfile = (profileData) => {
    if (!currentUser) return;
    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, ...profileData, profileCompleted: true } : u))
    );
    showToast('Profile updated successfully.');
  };

  // --- Student Actions ---
  const toggleSaveGrant = (grantId) => {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const isSaved = currentUser.savedGrants?.includes(grantId);
    let updatedSaved;
    
    if (isSaved) {
      updatedSaved = currentUser.savedGrants.filter(id => id !== grantId);
      showToast('Opportunity removed from saved list.');
    } else {
      updatedSaved = [...(currentUser.savedGrants || []), grantId];
      showToast('Opportunity saved successfully!');
    }

    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, savedGrants: updatedSaved } : u))
    );
  };

  const applyForGrant = (grantId, answers, uploadedFiles = []) => {
    if (!currentUser || currentUser.role !== 'student') return;

    // Check if already applied
    const alreadyApplied = applications.some(
      app => app.grantId === grantId && app.studentId === currentUser.id
    );

    if (alreadyApplied) {
      showToast('You have already applied for this opportunity.', 'error');
      return false;
    }

    // Process files
    const newDocs = uploadedFiles.map((file, idx) => ({
      id: `d-${Date.now()}-${idx}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      type: file.type || 'Document',
      date: new Date().toISOString().split('T')[0]
    }));

    // Update student's documents
    if (newDocs.length > 0) {
      setUsers(prev =>
        prev.map(u =>
          u.id === currentUser.id
            ? { ...u, documents: [...(u.documents || []), ...newDocs] }
            : u
        )
      );
    }

    const newApplication = {
      id: Date.now(),
      grantId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentGPA: currentUser.gpa || 'N/A',
      studentMajor: currentUser.major || 'N/A',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      answers,
      feedback: ''
    };

    setApplications(prev => [newApplication, ...prev]);
    showToast('Application submitted successfully!');
    return true;
  };

  // --- Provider Actions ---
  const createGrant = (grantData) => {
    if (!currentUser || currentUser.role !== 'provider') return;

    const newGrant = {
      id: Date.now(),
      providerId: currentUser.id,
      providerName: currentUser.foundationName,
      status: 'Pending', // Needs admin approval
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      ...grantData
    };

    setGrants(prev => [newGrant, ...prev]);
    showToast('Grant posted successfully and is pending admin review.');
    return true;
  };

  const updateApplicationStatus = (applicationId, status, feedback = '') => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status, feedback } : app
      )
    );
    showToast(`Application status updated to ${status}.`);
  };

  // --- Admin Actions ---
  const approveGrant = (grantId) => {
    setGrants(prev =>
      prev.map(g => (g.id === grantId ? { ...g, status: 'Approved' } : g))
    );
    showToast('Opportunity approved and is now public.');
  };

  const rejectGrant = (grantId) => {
    setGrants(prev =>
      prev.map(g => (g.id === grantId ? { ...g, status: 'Rejected' } : g))
    );
    showToast('Opportunity status set to Rejected.', 'info');
  };

  const verifyProvider = (providerId, isVerified = true) => {
    setUsers(prev =>
      prev.map(u => (u.id === providerId ? { ...u, verified: isVerified } : u))
    );
    showToast(isVerified ? 'Provider verified successfully.' : 'Provider verification removed.', 'info');
  };

  const toggleUserBlock = (userId) => {
    let targetName = '';
    let isBlocked = false;
    
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          targetName = u.name;
          isBlocked = !u.blocked;
          return { ...u, blocked: isBlocked };
        }
        return u;
      })
    );

    showToast(
      isBlocked ? `Blocked account for ${targetName}.` : `Unblocked account for ${targetName}.`,
      isBlocked ? 'error' : 'success'
    );
  };

  const addCategory = (categoryName) => {
    if (categories.includes(categoryName)) {
      showToast('Category already exists.', 'error');
      return;
    }
    setCategories(prev => [...prev, categoryName]);
    showToast('Category added.');
  };

  const deleteCategory = (categoryName) => {
    setCategories(prev => prev.filter(c => c !== categoryName));
    showToast('Category removed.');
  };

  return (
    <AppContext.Provider
      value={{
        users,
        grants,
        applications,
        categories,
        currentUser,
        theme,
        toasts,
        setCurrentUser,
        toggleTheme,
        showToast,
        login,
        logout,
        signup,
        updateProfile,
        toggleSaveGrant,
        applyForGrant,
        createGrant,
        updateApplicationStatus,
        approveGrant,
        rejectGrant,
        verifyProvider,
        toggleUserBlock,
        addCategory,
        deleteCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
