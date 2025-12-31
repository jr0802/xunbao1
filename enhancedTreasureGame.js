// 增强版寻宝游戏 - 使用async/await重写
class EnhancedTreasureHunt {
  constructor() {
    this.story = [];
    this.currentStage = 0;
    this.playerItems = [];
  }

  // 添加故事内容到日志
  addToStory(text, type = 'story') {
    const storyEntry = {
      text,
      type,
      timestamp: Date.now(),
      stage: this.currentStage
    };
    this.story.push(storyEntry);
    return storyEntry;
  }

  // 第一阶段：探索古代遗迹
  async exploreAncientRuins() {
    this.currentStage = 1;
    this.addToStory('🏛️ 你来到了传说中的古代遗迹群...', 'stage');
    
    await this.delay(1000);
    this.addToStory('古老的石柱上刻满了神秘的符号，它们在月光下闪闪发光...');
    
    await this.delay(1500);
    this.addToStory('突然，你发现了一个隐藏的入口！');
    
    return true;
  }

  // 第二阶段：解开古代符号谜题
  async solveAncientPuzzle() {
    this.currentStage = 2;
    this.addToStory('🧩 你需要解开古代的符号谜题...', 'stage');
    
    const symbols = ['☀', '🌙', '⭐', '🌊', '🔥'];
    this.addToStory(`符号提示: ${symbols.join(' → ')} 隐藏着时间的秘密...`);
    
    await this.delay(2000);
    
    // 模拟解题过程
    const correctSequence = [0, 1, 2, 1, 3, 2, 4];
    let attempts = 0;
    let solved = false;
    
    while (attempts < 3 && !solved) {
      attempts++;
      this.addToStory(`尝试 ${attempts}: 解读符号序列...`);
      await this.delay(800);
      
      if (attempts === 2) {
        solved = true;
        this.addToStory('✨ 恭喜！你成功解开了古代谜题！');
        this.playerItems.push('神秘钥匙');
        await this.delay(1000);
        this.addToStory('获得道具：🔑 神秘钥匙');
      } else {
        this.addToStory('❌ 这个顺序不太对...再试试看');
        await this.delay(500);
      }
    }
    
    if (!solved) {
      throw new Error('谜题太难了！你需要更仔细地观察...');
    }
    
    return true;
  }

  // 第三阶段：进入地下迷宫
  async enterUndergroundMaze() {
    this.currentStage = 3;
    this.addToStory('🏔️ 通过谜题后，你进入了神秘的地下迷宫...', 'stage');
    
    await this.delay(1500);
    this.addToStory('迷宫墙壁上闪烁着微弱的荧光，你听到了远处传来的神秘声音...');
    
    await this.delay(2000);
    this.addToStory('你遇到了一个三叉路口，每个方向都充满未知...');
    
    return true;
  }

  // 第四阶段：避开陷阱和守卫
  async avoidTrapsAndGuardians() {
    this.currentStage = 4;
    this.addToStory('⚔️ 迷宫深处潜藏着危险...', 'stage');
    
    await this.delay(1000);
    this.addToStory('突然！一只巨大的石像守卫出现在你面前！');
    
    await this.delay(1500);
    
    // 随机决定是否成功避开
    const success = Math.random() > 0.3;
    
    if (!success) {
      this.addToStory('石像守卫发动了攻击！你必须找到它的弱点...');
      await this.delay(2000);
      
      if (this.playerItems.includes('神秘钥匙')) {
        this.addToStory('你想起了神秘钥匙的光芒，也许它能帮助...');
        await this.delay(1000);
        this.addToStory('✨ 钥匙发出光芒，石像守卫被感化了！');
        this.playerItems.push('守护者的祝福');
        await this.delay(800);
        this.addToStory('获得祝福：🙏 守护者的祝福');
        return true;
      } else {
        throw new Error('你被石像守卫击败了...需要更强的装备！');
      }
    } else {
      this.addToStory('🎯 你巧妙地避开了所有的陷阱！');
      await this.delay(1000);
      this.addToStory('发现了一瓶古老的药剂...');
      this.playerItems.push('恢复药剂');
      await this.delay(800);
      this.addToStory('获得道具：🧪 恢复药剂');
      return true;
    }
  }

  // 第五阶段：解开宝藏机关
  async solveTreasureMechanism() {
    this.currentStage = 5;
    this.addToStory('🎯 你来到了宝藏的入口，但需要解开最后的机关...', 'stage');
    
    await this.delay(1500);
    this.addToStory('一个复杂的机械装置出现在你面前，需要正确的顺序激活...');
    
    await this.delay(2000);
    
    const mechanismSteps = [
      '观察机关的构造...',
      '找到启动按钮...',
      '输入正确的密码...',
      '激活最后的机关...'
    ];
    
    for (let i = 0; i < mechanismSteps.length; i++) {
      this.addToStory(`步骤 ${i + 1}: ${mechanismSteps[i]}`);
      await this.delay(1200 + Math.random() * 800);
    }
    
    // 检查是否有必要的道具
    if (this.playerItems.includes('神秘钥匙')) {
      this.addToStory('🔑 神秘钥匙完美地契合了机关的锁孔！');
      await this.delay(1000);
      this.addToStory('🎉 机关被成功激活！');
    } else {
      this.addToStory('没有合适的钥匙...你需要一个特殊的工具');
      await this.delay(1000);
      this.addToStory('你用智慧和耐心找到了另一种方法...');
    }
    
    return true;
  }

  // 第六阶段：发现最终宝藏
  async discoverFinalTreasure() {
    this.currentStage = 6;
    this.addToStory('🏆 最后的时刻到来了...', 'stage');
    
    await this.delay(1500);
    this.addToStory('随着机关的激活，一扇巨大的石门缓缓打开...');
    
    await this.delay(2000);
    this.addToStory('💎 眼前出现了一个闪闪发光的宝库！');
    
    await this.delay(1500);
    this.addToStory('你发现的不只是黄金珠宝，还有古代的智慧和知识...');
    
    await this.delay(2000);
    
    const treasures = [
      '💰 闪闪发光的古代金币',
      '📜 记载着失落文明的古籍',
      '🎭 精美的古代面具',
      '⚡ 神秘的能量水晶',
      '🌟 传说中的英雄之剑'
    ];
    
    treasures.forEach(treasure => {
      this.addToStory(`发现宝藏: ${treasure}`);
    });
    
    await this.delay(1500);
    this.addToStory('🎊 恭喜你！你成功完成了这个史诗般的寻宝冒险！', 'victory');
    
    return true;
  }

  // 延迟函数
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 主要的寻宝函数
  async startTreasureHunt() {
    this.story = [];
    this.currentStage = 0;
    this.playerItems = [];
    
    this.addToStory('🎮 欢迎来到增强版寻宝游戏！', 'start');
    this.addToStory('你的目标是找到传说中的失落宝藏...', 'start');
    
    try {
      await this.exploreAncientRuins();
      await this.solveAncientPuzzle();
      await this.enterUndergroundMaze();
      await this.avoidTrapsAndGuardians();
      await this.solveTreasureMechanism();
      await this.discoverFinalTreasure();
      
      return {
        success: true,
        story: this.story,
        items: this.playerItems,
        finalStage: this.currentStage
      };
      
    } catch (error) {
      this.addToStory(`💀 游戏结束: ${error.message}`, 'error');
      return {
        success: false,
        story: this.story,
        error: error.message,
        items: this.playerItems
      };
    }
  }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedTreasureHunt;
}