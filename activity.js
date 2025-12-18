// Activity Level Script - Updates based on time of day

function getActivityLevel(hour) {
    // Closed (00:00-05:00)
    if (hour >= 0 && hour < 5) {
        return { level: 'Closed', class: 'activity-closed' };
    }
    // Peak hours (High activity)
    else if ((hour >= 6 && hour < 9) || (hour >= 12 && hour < 14) || (hour >= 17 && hour < 21)) {
        return { level: 'High', class: 'activity-high' };
    }
    // Medium activity
    else if ((hour >= 9 && hour < 12) || (hour >= 14 && hour < 17) || (hour >= 21 && hour < 22)) {
        return { level: 'Medium', class: 'activity-medium' };
    }
    // Low activity (night/early morning)
    else {
        return { level: 'Low', class: 'activity-low' };
    }
}

function updateActivityLevels() {
    const now = new Date();
    const hour = now.getHours();
    const activity = getActivityLevel(hour);

    // Get emoji based on activity level
    const getEmoji = (level) => {
        switch(level) {
            case 'Closed': return '⚪';
            case 'High': return '🟢';
            case 'Medium': return '🟡';
            case 'Low': return '🔴';
            default: return '⚪';
        }
    };

    // Update Pure Gym Brabrand activity
    const pureGymCard = document.querySelector('.card-blue');
    if (pureGymCard) {
        const activityElement = pureGymCard.querySelector('.card-activity');
        if (activityElement) {
            const emoji = getEmoji(activity.level);
            activityElement.textContent = `Activity: ${emoji} ${activity.level}`;
        }
    }

    // Update Brabrand Lake activity (green card)
    const lakeCard = document.querySelector('.card-green');
    if (lakeCard) {
        const activityElement = lakeCard.querySelector('.card-activity');
        if (activityElement) {
            // Brabrand Lake is always Low activity
            const emoji = getEmoji('Low');
            activityElement.textContent = `Activity: ${emoji} Low`;
        }
    }

    // Update Calisthenics Park activity
    const calisthenicsCards = document.querySelectorAll('.card-blue');
    if (calisthenicsCards.length > 1) {
        const calisthenicsCard = calisthenicsCards[1];
        const activityElement = calisthenicsCard.querySelector('.card-activity');
        if (activityElement) {
            // Calisthenics Park has different peak hours
            const calisActivity = hour >= 12 && hour < 15 ? { level: 'Medium', class: 'activity-medium' } : { level: 'Low', class: 'activity-low' };
            const emoji = getEmoji(calisActivity.level);
            activityElement.textContent = `Activity: ${emoji} ${calisActivity.level}`;
        }
    }

    // Log current time and activity
    console.log(`Time: ${hour}:${String(now.getMinutes()).padStart(2, '0')} - Activity: ${activity.level}`);
}

// Update on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActivityLevels();
    
    // Update every minute
    setInterval(updateActivityLevels, 60000);
    
    // Optional: Update every 10 seconds for testing
    // setInterval(updateActivityLevels, 10000);
});

// Activity Level Time Schedule for Pure Gym Brabrand:
// 00:00-05:00 (Night) - CLOSED
// 06:00-09:00 (Morning rush) - HIGH
// 09:00-12:00 (Mid-morning) - MEDIUM
// 12:00-14:00 (Lunch time) - HIGH
// 14:00-17:00 (Afternoon) - MEDIUM
// 17:00-21:00 (Evening peak) - HIGH
// 21:00-22:00 (Late evening) - MEDIUM
// 22:00-00:00 (Night) - LOW

// Activity Level Time Schedule for Calisthenics Park Aarhus 0:
// 12:00-15:00 - MEDIUM
// 15:00-12:00 - LOW
