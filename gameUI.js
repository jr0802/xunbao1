// 游戏UI控制器
class TreasureGameUI {
    constructor() {
        this.game = new EnhancedTreasureHunt();
        this.isGameRunning = false;
        this.currentStoryIndex = 0;
        
        // 获取DOM元素
        this.elements = {
            startBtn: document.getElementById('startGameBtn'),
            restartBtn: document.getElementById('restartGameBtn'),
            storyLog: document.getElementById('storyLog'),
            playerItems: document.getElementById('playerItems'),
            currentStage: document.getElementById('currentStage'),
            progressPercent: document.getElementById('progressPercent'),
            progressFill: document.getElementById('progressFill'),
            playerStage: document.getElementById('playerStage'),
            itemCount: document.getElementById('itemCount'),
            gameStatus: document.getElementById('gameStatus'),
            loadingAnimation: document.getElementById('loadingAnimation')
        };
        
        this.initEventListeners();
        this.updateInitialUI();
    }

    // 初始化事件监听器
    initEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
    }

    // 更新初始UI状态
    updateInitialUI() {
        this.updateProgress(0, '准备开始');
        this.updateGameStatus('等待开始');
        this.updatePlayerStats(0, '准备开始', []);
    }

    // 开始游戏
    async startGame() {
        if (this.isGameRunning) return;
        
        this.isGameRunning = true;
        this.clearStoryLog();
        this.updateGameState('running');
        
        try {
            // 显示加载动画
            this.showLoading(true);
            
            // 开始寻宝冒险
            const result = await this.game.startTreasureHunt();
            
            // 处理游戏结果
            this.handleGameResult(result);
            
        } catch (error) {
            console.error('游戏运行时发生错误:', error);
            this.addStoryEntry('游戏过程中发生未知错误: ' + error.message, 'error');
        } finally {
            this.isGameRunning = false;
            this.showLoading(false);
            this.updateGameState('completed');
        }
    }

    // 重新开始游戏
    restartGame() {
        if (this.isGameRunning) return;
        
        this.clearStoryLog();
        this.updateGameState('ready');
        this.game = new EnhancedTreasureHunt();
        
        // 添加欢迎信息
        this.addStoryEntry('🎯 欢迎回到增强版寻宝游戏！', 'start');
        this.addStoryEntry('点击"开始寻宝"按钮，再次踏上你的史诗冒险之旅...', 'start');
    }

    // 处理游戏结果
    handleGameResult(result) {
        if (result.success) {
            this.addStoryEntry('🎊 恭喜！你成功完成了史诗般的寻宝冒险！', 'victory');
            this.updateGameStatus('冒险成功！');
        } else {
            this.addStoryEntry(`💀 冒险失败: ${result.error}`, 'error');
            this.updateGameStatus('冒险失败');
        }
    }

    // 显示/隐藏加载动画
    showLoading(show) {
        this.elements.loadingAnimation.style.display = show ? 'flex' : 'none';
    }

    // 更新游戏状态
    updateGameState(state) {
        switch (state) {
            case 'running':
                this.elements.startBtn.disabled = true;
                this.elements.restartBtn.disabled = true;
                this.updateGameStatus('冒险进行中...');
                break;
            case 'completed':
                this.elements.startBtn.disabled = false;
                this.elements.restartBtn.disabled = false;
                break;
            case 'ready':
                this.elements.startBtn.disabled = false;
                this.elements.restartBtn.disabled = true;
                break;
        }
    }

    // 更新进度条
    updateProgress(percent, stageText) {
        this.elements.progressFill.style.width = `${percent}%`;
        this.elements.progressPercent.textContent = `${Math.round(percent)}%`;
        this.elements.currentStage.textContent = stageText;
    }

    // 更新游戏状态文本
    updateGameStatus(status) {
        this.elements.gameStatus.textContent = status;
    }

    // 更新玩家统计信息
    updatePlayerStats(stage, items) {
        this.elements.playerStage.textContent = stage;
        this.elements.itemCount.textContent = `${items.length} 件`;
        this.updatePlayerItems(items);
    }

    // 更新玩家物品
    updatePlayerItems(items) {
        const container = this.elements.playerItems;
        
        if (items.length === 0) {
            container.innerHTML = '<div class="empty-items">暂无物品</div>';
            return;
        }
        
        container.innerHTML = items.map(item => 
            `<div class="item-card" title="${item}">
                <div class="item-icon">${this.getItemIcon(item)}</div>
                <div class="item-name">${item}</div>
            </div>`
        ).join('');
    }

    // 获取物品图标
    getItemIcon(item) {
        const iconMap = {
            '神秘钥匙': '🔑',
            '恢复药剂': '🧪',
            '守护者的祝福': '🙏',
            '古代金币': '💰',
            '智慧古籍': '📜',
            '英雄之剑': '⚔️',
            '能量水晶': '💎'
        };
        return iconMap[item] || '🎁';
    }

    // 清空故事日志
    clearStoryLog() {
        this.elements.storyLog.innerHTML = '';
        this.currentStoryIndex = 0;
    }

    // 添加故事条目
    addStoryEntry(text, type = 'story') {
        const entry = document.createElement('div');
        entry.className = `story-entry ${type}`;
        entry.innerHTML = text;
        
        this.elements.storyLog.appendChild(entry);
        this.elements.storyLog.scrollTop = this.elements.storyLog.scrollHeight;
        
        this.currentStoryIndex++;
        
        // 模拟实时更新进度和状态
        this.simulateGameProgress();
    }

    // 模拟游戏进度更新
    simulateGameProgress() {
        const storyEntries = this.elements.storyLog.children;
        const totalEntries = storyEntries.length;
        
        // 根据故事条目数量估算进度
        let progress = Math.min((totalEntries / 20) * 100, 100);
        let stageText = '探索中...';
        
        // 根据当前阶段更新进度文本
        if (progress < 20) {
            stageText = '探索古代遗迹';
        } else if (progress < 40) {
            stageText = '解开古代谜题';
        } else if (progress < 60) {
            stageText = '穿越地下迷宫';
        } else if (progress < 80) {
            stageText = '战胜守卫';
        } else if (progress < 100) {
            stageText = '解开宝藏机关';
        } else {
            stageText = '发现宝藏';
        }
        
        this.updateProgress(progress, stageText);
        
        // 更新玩家物品统计（基于故事内容）
        const items = this.extractItemsFromStory();
        this.updatePlayerStats(stageText, items);
    }

    // 从故事中提取物品信息
    extractItemsFromStory() {
        const items = [];
        const storyEntries = this.elements.storyLog.children;
        
        for (const entry of storyEntries) {
            const text = entry.textContent;
            
            if (text.includes('获得道具：')) {
                const itemMatch = text.match(/获得道具：(.+)/);
                if (itemMatch) {
                    items.push(itemMatch[1].trim());
                }
            }
            
            if (text.includes('获得祝福：')) {
                const blessingMatch = text.match(/获得祝福：(.+)/);
                if (blessingMatch) {
                    items.push(blessingMatch[1].trim());
                }
            }
        }
        
        return [...new Set(items)]; // 去重
    }

    // 重写EnhancedTreasureHunt的addToStory方法以支持UI更新
    enableRealTimeUpdates() {
        const originalAddToStory = this.game.addToStory;
        this.game.addToStory = (text, type) => {
            const storyEntry = originalAddToStory.call(this.game, text, type);
            this.addStoryEntry(text, type);
            return storyEntry;
        };
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const gameUI = new TreasureGameUI();
    gameUI.enableRealTimeUpdates();
    
    // 全局错误处理
    window.addEventListener('error', (event) => {
        console.error('页面错误:', event.error);
        gameUI.addStoryEntry('页面发生错误: ' + event.message, 'error');
    });
    
    // 添加一些额外的交互效果
    addInteractiveEffects();
});

// 添加交互效果
function addInteractiveEffects() {
    // 按钮点击波纹效果
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            createRippleEffect(e.target, e);
        }
    });
    
    // 物品卡片悬停效果
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('item-card') || e.target.closest('.item-card')) {
            const card = e.target.classList.contains('item-card') ? e.target : e.target.closest('.item-card');
            card.style.transform = 'translateY(-5px) scale(1.05)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('item-card') || e.target.closest('.item-card')) {
            const card = e.target.classList.contains('item-card') ? e.target : e.target.closest('.item-card');
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
}

// 创建波纹效果
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 添加波纹动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);